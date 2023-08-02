const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
// Replace 'YOUR_TELEGRAM_BOT_TOKEN' with your actual bot token
const botToken = process.env.BOT_TOKEN;
const bot = new TelegramBot(botToken);

module.exports = async (req, res) => {
  // Parse the incoming request from Telegram
  const requestBody = req.body;

  // Process the incoming message
  const message = requestBody.message;
  const chatId = message.chat.id;
  const text = message.text;

  // Your bot logic here...
  const responseText = `Received: ${text}`;

  // Send the response back to the user
  await bot.sendMessage(chatId, responseText);

  res.status(200).end();
};
