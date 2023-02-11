const bot = require('../bot');
const messages = require('../i18n/messages');
const isForwarded = require('../helpers/forward');

bot.command('propose', async ctx => {
    try {
        if (isForwarded(ctx)) {
            return ctx;
        }

        await ctx.scene.enter('proposal');
    } catch (error) {
        console.error('propose.js', error);
        await ctx.sendMessage(error?.error ?? messages.error);
    }
});

module.exports = bot;
