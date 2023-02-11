const Player = require('../models/player');
const Score = require('../models/score');
const Status = require('../models/status');
const returnUserName = require('./username');

module.exports = async (channel, user) => {
    let player = await Player.findOne({ entity_id: user.id });

    if (!player) {
        player = await new Player({
            entity_id: user.id,
            name: returnUserName(user, 'name')
        });

        await player.save();
    }

    const channelAndPlayersIds = {
        channel_id: channel._id,
        player_id: player._id
    };

    let score = await Score.findOne(channelAndPlayersIds);

    if (!score) {
        score = await new Score(channelAndPlayersIds);

        score.save();
    }

    let status = await Status.findOne(channelAndPlayersIds);

    if (!status) {
        status = await new Status(channelAndPlayersIds);

        await status.save();
    }

    await channel.addPlayer(player, score, status);

    return player;
};
