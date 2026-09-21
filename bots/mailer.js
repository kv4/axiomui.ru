// Отправка писем по SMTP. Единственный канал уведомлений (Telegram отключён).
// Все параметры — из bots/.env. Секреты в код и git не попадают.
require("dotenv").config();
const nodemailer = require("nodemailer");

const host = process.env.SMTP_HOST || "smtp.yandex.ru";
const port = Number(process.env.SMTP_PORT || 465);
const user = process.env.SMTP_USER || "chernyakov.k@yandex.ru";
const pass = process.env.SMTP_PASS || "";
// Порт 465 — SSL (secure), 587 — STARTTLS. SMTP_SECURE нужен только для тестовых стендов.
const secure = process.env.SMTP_SECURE
  ? process.env.SMTP_SECURE === "true"
  : port === 465;

const configured = Boolean(user && pass);

const transport = configured
  ? nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    })
  : null;

function to() {
  return process.env.MAIL_TO || "chernyakov.k@yandex.ru";
}

async function sendMail({ subject, text, replyTo }) {
  if (!transport) {
    throw new Error("SMTP не настроен: задайте SMTP_USER и SMTP_PASS в bots/.env");
  }
  return transport.sendMail({
    from: process.env.MAIL_FROM || "AxiomUI <" + user + ">",
    to: to(),
    subject,
    text,
    replyTo,
  });
}

module.exports = { sendMail, to, isConfigured: () => configured };
