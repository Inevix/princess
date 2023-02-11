const { Schema, model } = require('mongoose');

module.exports = model(
    'Player',
    new Schema({
        entity_id: {
            type: Number,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true,
            unique: false
        }
    })
);
