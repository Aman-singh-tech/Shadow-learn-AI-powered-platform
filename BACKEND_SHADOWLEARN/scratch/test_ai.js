const { GoogleGenAI } = require('@google/genai');
require('dotenv').config({ path: './.env' });

async function testAI() {
    console.log('Testing AI with API Key:', process.env.GEMINI_API_KEY ? 'Present' : 'Missing');
    
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    try {
        console.log('Sending request to Gemini...');
        console.log('Listing models...');
        const models = await ai.models.list();
        console.log('Available Models Response:', JSON.stringify(models, null, 2));
    } catch (error) {
        console.error('Operation Failed:');
        console.error(error.message);
    }
}

testAI();
