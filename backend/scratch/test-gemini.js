const { GoogleGenerativeAI } = require('@google/genai');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const apiKey = process.env.GEMINI_API_KEY;
console.log('Using API key:', apiKey);

if (!apiKey) {
    console.error('API key is missing!');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

async function run() {
    try {
        console.log('Sending request to Gemini...');
        const result = await model.generateContent('Explain AI search in one sentence.');
        console.log('Result:', result.response.text());
    } catch (err) {
        console.error('Error occurred:');
        console.error(err);
    }
}

run();
