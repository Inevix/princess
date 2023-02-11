const bot = require('../bot');
const Score = require('../models/score');
const getChatAndUser = require('../helpers/chat');
const isAdmin = require('../helpers/admin');
const returnUserName = require('../helpers/username');
const messages = require('../i18n/messages');
const isForwarded = require('../helpers/forward');

bot.command('reset', async ctx => {
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
        }

        if (!channel.players.length) {
            return await ctx.sendMessage(messages.playersNotFound);
        }

        for await (const player of channel.players) {
            await Score.findByIdAndUpdate(player.score_id, {
                score: 0
            });
        }

        await channel.updateOne({
            updated_at: null
        });
        await ctx.sendMessage(messages.successReset);
    } catch (error) {
        console.error('reset.js', error);
        await ctx.sendMessage(error?.error ?? messages.error);
    }
});

module.exports = bot;
