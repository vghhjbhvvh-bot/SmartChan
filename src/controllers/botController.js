const { TelegramBot } = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

const startBot = () => {
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
};

module.exports = { startBot };