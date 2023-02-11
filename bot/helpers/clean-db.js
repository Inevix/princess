const Channel = require('../models/channel');

module.exports = async () => {
    const inactiveChannels = await Channel.find({
        updated_at: {
            $lt: new Date(new Date() - 30 * 24 * 3600 * 1000)
        }
    });

    for await (const inactiveChannel of inactiveChannels) {
        await inactiveChannel.removePlayers();
        await inactiveChannel.remove();
    }

    await Promise.resolve();
};
