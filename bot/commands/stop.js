const bot = require('../bot');
const getChatAndUser = require('../helpers/chat');
const isAdmin = require('../helpers/admin');
const returnUserName = require('../helpers/username');
const messages = require('../i18n/messages');
const isForwarded = require('../helpers/forward');

bot.command('stop', async ctx => {
    try {
        if (isForwarded(ctx)) {
            return ctx;
        }

        const { channel, member } = await getChatAndUser(ctx);
        const isUserAdmin = await isAdmin(member);

        if (!isUserAdmin) {
            return await ctx.sendMessage(
                messages.accessDenied.replace('%s', returnUserName(member.user))
            );
        } else if (!channel.players.length) {
            return await ctx.sendMessage(messages.alreadyStop);
        }

        await channel.removePlayers();
        await channel.remove();
        await ctx.sendMessage(messages.successStop);
    } catch (error) {
        console.error('stop.js', error);
        await ctx.sendMessage(error?.error ?? messages.error);
    }
});

module.exports = bot;
