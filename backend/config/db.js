const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
    try {
        if (!config.MONGODB_URI) {
            console.warn('WARNING: MONGODB_URI is not defined in environment variables.');
            return;
        }

        const conn = await mongoose.connect(config.MONGODB_URI, {
            serverSelectionTimeoutMS: 50000,
            socketTimeoutMS: 45000
        });

        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;

