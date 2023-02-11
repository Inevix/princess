const bot = require('../bot');
const initChat = require('../helpers/init');
const returnUserName = require('../helpers/username');
const messages = require('../i18n/messages');
const isForwarded = require('../helpers/forward');

bot.start(async ctx => {
    try {
        if (isForwarded(ctx)) {
            return ctx;
        }

        const {
            update: {
                message: { from, chat }
            }
        } = ctx;

        if (from.id === chat.id) {
            return await ctx.replyWithHTML(
                messages.greetings.replace('%s', returnUserName(from, 'name')) +
                    `\n\n${messages.greetingsError}`
            );
        }

        const member = await ctx.getChatMember(from.id);

        if (!member) {
            return await ctx.sendMessage(messages.error);
        }

        if (member.user.is_bot) {
            return await ctx.sendMessage(
                messages.accessDenied.replace('%s', returnUserName(member.user))
            );
        }

        await initChat(chat.id);
        await ctx.replyWithHTML(
            messages.greetings.replace('%s', returnUserName(from, 'name')) +
                `\n\n<strong>${
                    messages.commandsLabel
                }:</strong>\n${messages.commands.join('\n')}`
        );
    } catch (error) {
        console.error('start.js', error);
        await ctx.sendMessage(messages.error);
    }
});

module.exports = bot;
