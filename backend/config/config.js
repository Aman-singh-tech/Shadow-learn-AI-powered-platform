const dotenv = require('dotenv');
dotenv.config();

const config = {
    PORT: process.env.PORT || 5000,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET || 'secret123',
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
    AI_API_KEY: process.env.AI_API_KEY,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    NODE_ENV: process.env.NODE_ENV || 'development',
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '715090563506-2c7sl3uhrpo60692v3p1v8rr0mr0nspv.apps.googleusercontent.com'
};

module.exports = config;
