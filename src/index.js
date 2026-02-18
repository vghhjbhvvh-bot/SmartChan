const express = require('express');
const axios = require('axios');
const { TelegramBot } = require('node-telegram-bot-api');
const groq = require('groq');
require('dotenv').config();
const app = express();
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
const groqClient = new groq.Client(process.env.GROQ_API_KEY);

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  if (text.startsWith('/')) {
    const command = text.substring(1);
    switch (command) {
      case 'start':
        bot.sendMessage(chatId, 'Welcome to the channel!');
        break;
      case 'help':
        bot.sendMessage(chatId, 'Available commands: /start, /help, /vote');
        break;
      case 'vote':
        const voteMessage = 'Please vote for the channel:';
        bot.sendMessage(chatId, voteMessage, {
          reply_markup: {
            inline_keyboard: [
              [
                { text: 'Good', callback_data: 'good' },
                { text: 'Bad', callback_data: 'bad' }
              ]
            ]
          }
        });
        break;
      default:
        bot.sendMessage(chatId, 'Unknown command');
    }
  } else if (text.startsWith('@')) {
    const mention = text.substring(1);
    if (mention === 'smart' || mention === 'bot') {
      bot.sendMessage(chatId, 'Yes?');
    }
  }
});

bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;
  if (data === 'good' || data === 'bad') {
    const voteCount = groqClient.getVoteCount(chatId);
    bot.sendMessage(chatId, `Vote count: ${voteCount}`);
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});