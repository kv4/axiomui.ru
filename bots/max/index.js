// Входящие сообщения из мессенджера MAX. Уведомление владельцу — письмом по SMTP.
require("dotenv").config();
const { Bot } = require("@maxhub/max-bot-api");
const { sendMail } = require("../mailer");

const token = process.env.MAX_BOT_TOKEN;

const bot = new Bot(token);

async function notifyOwner(userName, text, userId) {
  try {
    await sendMail({
      subject: "MAX: сообщение от " + (userName || "неизвестного"),
      text:
        "Мессенджер: MAX\n" +
        "Клиент: " + (userName || "?") + "\n" +
        "ID: " + userId + "\n\n" +
        (text || "(пусто)"),
    });
    return true;
  } catch (e) {
    console.error("Не удалось отправить уведомление письмом:", e.message);
    return false;
  }
}

bot.command("start", (ctx) => {
  ctx.reply(
    "Здравствуйте! Это AxiomUI — аудит legacy-кода и внедрение ИИ-агентов.\n\nОставьте заявку или задайте вопрос.",
  );
});

bot.on("message_created", async (ctx) => {
  const update = ctx.update || {};
  const message = update.message || {};
  const sender = message.sender || {};
  const body = message.body || {};

  const userName = sender.name || sender.first_name || "?";
  const text = body.text || "";
  const userId = sender.user_id;

  if (userId) {
    await notifyOwner(userName, text, userId);
  }

  ctx.reply("Спасибо за сообщение! Мы свяжемся с вами в ближайшее время.");
});

bot.start().catch((err) => {
  console.error("MAX bot failed to start:", err.message);
  process.exit(1);
});
console.log("MAX bot started (уведомления — письмом по SMTP)");
