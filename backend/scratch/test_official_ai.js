const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: './.env' });

async function testOfficialAI() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
        console.log('Sending request to Gemini 1.5 Flash...');
        const result = await model.generateContent("Say hello in a way that sounds like a futuristic AI.");
        const response = await result.response;
        const text = response.text();
        console.log('AI Response:', text);
    } catch (error) {
        console.error('AI Error:', error.message);
    }
}

testOfficialAI();
