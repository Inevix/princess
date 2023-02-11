const bot = require('../bot');
const cleanDB = require('../helpers/clean-db');
const run = require('../helpers/run');
const messages = require('../i18n/messages');
const isForwarded = require('../helpers/forward');

bot.command('sudorun', async ctx => {
    try {
        if (isForwarded(ctx)) {
            return ctx;
        }

        await run(ctx, 'manual', true);
        await cleanDB();
    } catch (error) {
        if (error?.type === 'auto') {
            return ctx;
        }

        const text = error?.error ?? messages.error;

        if (!error?.error) {
            console.error('sudorun.js', error);
        }

        if (error?.html) {
            await ctx.replyWithHTML(text);
        } else {
            await ctx.sendMessage(text);
        }
    }
});

module.exports = bot;
