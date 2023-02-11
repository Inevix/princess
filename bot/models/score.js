const { Schema, model } = require('mongoose');

module.exports = model(
    'Score',
    new Schema({
        channel_id: {
            type: Schema.Types.ObjectId,
            ref: 'Channel'
        },
        player_id: {
            type: Schema.Types.ObjectId,
            ref: 'Player'
        },
        score: {
            type: Number,
            default: 0,
            required: true
        }
    })
);
