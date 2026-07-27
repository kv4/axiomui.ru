require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const http = require("http");

const tgToken = process.env.TELEGRAM_BOT_TOKEN;
const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
const maxToken = process.env.MAX_BOT_TOKEN;

const API_BASE = "https://platform-api2.max.ru";

async function sendToMax(userId, text) {
  if (!maxToken) return false;
  try {
    const url = API_BASE + "/messages?user_id=" + userId;
    const resp = await fetch(url, {
      method: "POST",
      headers: { Authorization: maxToken, "Content-Type": "application/json" },
      body: JSON.stringify({ text: text }),
    });
    return resp.ok;
  } catch (e) {
    console.error("Failed to send to MAX:", e.message);
    return false;
  }
}

const server = http.createServer(async (req, res) => {
  if (req.method !== "POST" || req.url !== "/api/contact") {
    res.writeHead(404);
    res.end();
    return;
  }

  let body = "";
  req.on("data", (c) => (body += c));
  req.on("end", async () => {
    try {
      const data = JSON.parse(body);
      const text =
        "<b>Новая заявка с axiomui.ru</b>\n\n" +
        "<b>Имя:</b> " + (data.name || "") + "\n" +
        "<b>Контакт:</b> " + (data.contact || "") + "\n" +
        "<b>Проект:</b> " + (data.message || "");

      const url = "https://api.telegram.org/bot" + tgToken + "/sendMessage";
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: adminChatId,
          text: text,
          parse_mode: "HTML",
        }),
      });

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: true }));
    } catch (e) {
      console.error("Contact API error:", e.message);
      res.writeHead(400);
      res.end(JSON.stringify({ ok: false, error: e.message }));
    }
  });
});

server.listen(3001, "127.0.0.1", () => {
  console.log("Contact API listening on :3001");
});

process.on('unhandledRejection', (err) => {
  console.error("Unhandled Rejection:", err.message);
});

const bot = new TelegramBot(tgToken, { polling: true });

bot.on('polling_error', (err) => {
  console.error("Polling error:", err.message);
});

const userCooldowns = new Map();
function checkCooldown(chatId) {
  const last = userCooldowns.get(chatId);
  if (last && Date.now() - last < 15 * 60 * 1000) return true;
  userCooldowns.set(chatId, Date.now());
  return false;
}

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "AxiomUI — аудит legacy-кода и внедрение ИИ-агентов. Напишите ваш вопрос, и мы ответим в рабочее время.",
  );
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;

  if (String(chatId) === String(adminChatId)) {
    if (!msg.reply_to_message) return;

    const repliedText = msg.reply_to_message.text || msg.reply_to_message.caption || "";
    const tgMatch = repliedText.match(/🆔 tg:(\d+)/);
    const maxMatch = repliedText.match(/🆔\s*(\d+)/);

    if (tgMatch) {
      const customerChatId = parseInt(tgMatch[1], 10);
      const replyText = msg.text;
      if (!replyText || replyText.startsWith("/")) return;
      await bot.sendMessage(customerChatId, replyText);
      bot.sendMessage(adminChatId, "✅ Ответ отправлен клиенту в Telegram", { reply_to_message_id: msg.message_id });
    } else if (maxMatch) {
      const maxUserId = parseInt(maxMatch[1], 10);
      const replyText = msg.text;
      if (!replyText || replyText.startsWith("/")) return;
      const ok = await sendToMax(maxUserId, replyText);
      bot.sendMessage(adminChatId, ok ? "✅ Ответ отправлен в MAX" : "❌ Ошибка отправки в MAX", { reply_to_message_id: msg.message_id });
    }

    return;
  }

  if (checkCooldown(chatId)) {
    bot.sendMessage(chatId, "Пожалуйста, подождите немного перед отправкой следующего сообщения.");
    return;
  }

  if (!msg.text || msg.text === "/start") return;

  const forwardMsg = `📩 <b>Telegram | Новое сообщение</b>\n👤 <b>Имя:</b> ${msg.from?.first_name || "?"} ${msg.from?.last_name || ""}\n💬 <b>Текст:</b> ${msg.text}\n🆔 tg:${chatId}\n\n<i>Ответь на это сообщение, чтобы отправить ответ</i>`;
  await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: adminChatId, text: forwardMsg, parse_mode: "HTML" }),
  });

  bot.sendMessage(chatId, "Спасибо за сообщение! Мы свяжемся с вами в ближайшее время.");
});

console.log("Telegram admin bot started");
