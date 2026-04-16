const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: './.env' });

async function checkModels() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    try {
        console.log('Fetching model list via fetch (REST)...');
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
        const data = await response.json();
        
        if (data.models) {
            const list = data.models
                .filter(m => m.supportedActions.includes('generateContent'))
                .map(m => m.name);
            console.log('Models supporting generateContent:', list);
        } else {
            console.log('No models found in response:', data);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

checkModels();
