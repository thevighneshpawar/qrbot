const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const botToken = process.env.BOT_TOKEN;
const bot = new TelegramBot(botToken, { polling: false });
const qr = require('qr-image');
const fs = require('fs');

const webhookUrl = 'https://YOUR_VERCEL_DEPLOYED_URL/api/webhook';
bot.setWebHook(webhookUrl);

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Send Url");   
});

bot.on('message', (msg) => {
  const url = msg.text;

  // Check if the message contains a URL
  if (isURL(url)) {
    // Generate QR code image
    const qr_png = qr.imageSync(url, { type: 'png' });

    // Save QR code image to a file
    fs.writeFileSync('qr_img.png', qr_png);

    // Send the QR code image to the user
    bot.sendPhoto(msg.chat.id, fs.readFileSync('qr_img.png'));

    // Optional: You can remove the image file after sending it if you want
    fs.unlinkSync('qr_img.png');
  }
});

function isURL(text) {
  // Simple URL validation using regex
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlRegex.test(text);
}
