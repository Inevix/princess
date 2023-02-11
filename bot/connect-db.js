const { join } = require('path');

require('dotenv').config({
    path: join(__dirname, '..', 'env', `.env.${process.env.NODE_ENV}`)
});

const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

module.exports = async () => {
    try {
        await new mongoose.connect(process.env.MONGODB_URI);

        console.log('DB successfully connected!');
        Promise.resolve();
    } catch (error) {
        console.log('DB connection error!');
        Promise.reject(error);
    }
};
