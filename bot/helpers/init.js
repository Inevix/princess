const Channel = require('../models/channel');
const getVersion = require('./version');

module.exports = async currentChatId => {
    let channel = await Channel.findOne({ entity_id: currentChatId });

    if (channel) {
        await channel.updateOne({
            release: getVersion()
        });

        return;
    }

    channel = await new Channel({
        entity_id: currentChatId,
        release: getVersion(),
        players: []
    });

    await channel.save();
};
