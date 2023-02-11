const {
    Telegraf,
    Scenes: { BaseScene }
} = require('telegraf');
const messages = require('../i18n/messages');
const returnUserName = require('../helpers/username');

const proposalScene = new BaseScene('proposal');

proposalScene.enter(async ctx => await ctx.sendMessage(messages.proposalEnter));
proposalScene.leave(async ctx => {
    return await ctx.sendMessage(messages.proposalLeave);
});
proposalScene.on('text', async ctx => {
    try {
        if (ctx?.update?.message?.text?.match('/')) {
            return await ctx.sendMessage(messages.proposalWrong);
        }

        await ctx.telegram.sendMessage(
            process.env.ADMIN_ID,
            `${ctx.update.message.text}\n${messages.from.replace(
                '%s',
                returnUserName(ctx.update.message.from)
            )}`
        );
        await ctx.scene.leave();
    } catch (error) {
        await ctx.sendMessage(error?.error ?? messages.error);
    }
});

module.exports = proposalScene;
