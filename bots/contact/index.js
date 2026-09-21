// Приём заявок с сайта axiomui.ru.
// Порядок: заявка сначала сохраняется в файл (чтобы не потерялась), затем уходит письмом по SMTP.
// Telegram из цепочки убран — сайт шлёт только сюда, отсюда только письмо.
require("dotenv").config();
const http = require("http");
const fs = require("fs");
const path = require("path");
const { sendMail, to, isConfigured } = require("../mailer");

const PORT = Number(process.env.CONTACT_PORT || 3001);
const LEADS_FILE =
  process.env.LEADS_FILE || path.join(__dirname, "..", "leads.ndjson");
const MAX_BODY = 64 * 1024;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;

const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (list.length >= RATE_MAX) return true;
  list.push(now);
  hits.set(ip, list);
  return false;
}

function saveLead(lead) {
  try {
    fs.appendFileSync(LEADS_FILE, JSON.stringify(lead) + "\n");
    return true;
  } catch (e) {
    console.error("Не удалось сохранить заявку в файл:", e.message);
    return false;
  }
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    let body = "";
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY) {
        reject(new Error("Тело запроса слишком большое"));
        req.destroy();
        return;
      }
      body += chunk;
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function json(res, code, payload) {
  res.writeHead(code, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

async function handleContact(req, res) {
  const ip = String(req.headers["x-real-ip"] || req.socket.remoteAddress || "");
  if (rateLimited(ip)) {
    console.warn("Слишком много заявок, отклоняю:", ip);
    json(res, 429, { ok: false, error: "Слишком много заявок, попробуйте позже" });
    return;
  }

  let data;
  try {
    data = JSON.parse(await readBody(req));
  } catch (e) {
    json(res, 400, { ok: false, error: e.message });
    return;
  }

  const name = String(data.name || "").trim();
  const contact = String(data.contact || "").trim();
  const message = String(data.message || "").trim();

  if (!name || !contact) {
    json(res, 400, { ok: false, error: "Заполните имя и контактные данные" });
    return;
  }

  const lead = {
    receivedAt: new Date().toISOString(),
    ip,
    name,
    contact,
    message,
  };
  const saved = saveLead(lead);

  const text =
    "Новая заявка с axiomui.ru\n\n" +
    "Имя: " + name + "\n" +
    "Контакт: " + contact + "\n\n" +
    "Проект:\n" + (message || "(не указано)") + "\n\n" +
    "Получено: " + lead.receivedAt + "\n";

  try {
    await sendMail({
      subject: "Заявка с axiomui.ru — " + name,
      text,
      replyTo: /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(contact) ? contact : undefined,
    });
  } catch (e) {
    console.error("Не удалось отправить заявку письмом:", e.message);
    json(res, 500, {
      ok: false,
      error: "Не удалось отправить заявку" + (saved ? " (заявка сохранена)" : ""),
    });
    return;
  }

  console.log("Заявка отправлена письмом: " + name + " -> " + to());
  json(res, 200, { ok: true });
}

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/api/contact") {
    handleContact(req, res).catch((e) => {
      console.error("Необработанная ошибка:", e.message);
      json(res, 500, { ok: false, error: "Внутренняя ошибка" });
    });
    return;
  }
  if (req.method === "GET" && (req.url === "/api/health" || req.url === "/health")) {
    json(res, 200, { ok: true, smtp: isConfigured() });
    return;
  }
  res.writeHead(404);
  res.end();
});

server.listen(PORT, "127.0.0.1", () => {
  console.log("Приём заявок слушает :" + PORT + " (письма на " + to() + ")");
  if (!isConfigured()) {
    console.warn(
      "ВНИМАНИЕ: SMTP_USER / SMTP_PASS не заданы — письма отправляться не будут, заявки только сохраняются в " +
        LEADS_FILE,
    );
  }
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err && err.message);
});
