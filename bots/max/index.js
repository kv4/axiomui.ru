require("dotenv").config();
const { Bot } = require("@maxhub/max-bot-api");

const token = process.env.MAX_BOT_TOKEN;
const tgToken = process.env.TELEGRAM_BOT_TOKEN;
const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;

const bot = new Bot(token);

async function notifyAdmin(userName, text, userId) {
  if (!tgToken || !adminChatId) return;
  const msg = "📩 <b>MAX | Новая заявка</b>\n👤 <b>Клиент:</b> " + (userName || "?") + "\n💬 <b>Сообщение:</b> " + (text || "(пусто)") + "\n🆔 " + userId + "\n\n<i>Ответь на это сообщение, чтобы отправить ответ</i>";
  try {
    const url = "https://api.telegram.org/bot" + tgToken + "/sendMessage";
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: adminChatId, text: msg, parse_mode: "HTML" }),
    });
    return resp.json();
  } catch (e) {
    console.error("Failed to notify admin:", e.message);
  }
}

bot.command("start", (ctx) => {
  ctx.reply("Здравствуйте! Это AxiomUI — аудит legacy-кода и внедрение ИИ-агентов.\n\nОставьте заявку или задайте вопрос.");
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
    await notifyAdmin(userName, text, userId);
  }

  ctx.reply("Спасибо за сообщение! Мы свяжемся с вами в ближайшее время.");
});

bot.start();
console.log("MAX bot started");
