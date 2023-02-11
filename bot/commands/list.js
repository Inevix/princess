const bot = require('../bot');
const getList = require('../helpers/list');
const messages = require('../i18n/messages');
const isForwarded = require('../helpers/forward');

bot.command('list', async ctx => {
    try {
        if (isForwarded(ctx)) {
            return ctx;
        }

        await getList(ctx);
    } catch (error) {
        console.error('list.js', error);
        await ctx.sendMessage(error?.error ?? messages.error);
    }
});

module.exports = bot;
