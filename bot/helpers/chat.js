const Channel = require('../models/channel');
const messages = require('../i18n/messages');
const returnUserName = require('./username');

module.exports = async (ctx, type = 'manual') => {
    const member = await ctx.getChatMember(ctx.update.message.from.id);

    if (!member) {
        return Promise.reject({
            error: messages.hasNotData
        });
    } else if (member.user.is_bot) {
        return Promise.reject({
            error: messages.accessDenied.replace(
                '%s',
                returnUserName(member.user)
            )
        });
    }

    const channel = await Channel.findOne({
        entity_id: ctx.update.message.chat.id
    });

    if (!channel && type === 'manual') {
        return Promise.reject({
            error: messages.hasNotData
        });
    }

    return Promise.resolve({
        channel,
        member
    });
};
