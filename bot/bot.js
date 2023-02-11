const {
    Telegraf,
    Scenes: { Stage }
} = require('telegraf');
const { SessionManager } = require('@puregram/session');
const AppScenes = require('./scenes');

const bot = new Telegraf(process.env.BOT_TOKEN);
const stage = new Stage([...AppScenes]);

if (process.env.NODE_ENV === 'dev') {
    bot.use(Telegraf.log());
}

bot.use(new SessionManager().middleware);
bot.use(stage.middleware());
bot.catch(error => console.error(error));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

module.exports = bot;
