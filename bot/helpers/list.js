const getChatAndUser = require('../helpers/chat');
const printPlayers = require('../helpers/print');
const messages = require('../i18n/messages');

module.exports = async (ctx, list = 'all') => {
    const { channel } = await getChatAndUser(ctx);

    if (!channel.players.length) {
        return Promise.reject({
            error: messages.playersNotFound
        });
    }

    await printPlayers(ctx, channel, list);
};
