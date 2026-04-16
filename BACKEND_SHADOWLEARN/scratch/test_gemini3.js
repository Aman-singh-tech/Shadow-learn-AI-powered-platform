const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: './.env' });

async function testGemini3() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    try {
        console.log('Sending request to Gemini 3 Flash Preview...');
        const result = await model.generateContent("Hello, are you active?");
        const response = await result.response;
        console.log('AI Response:', response.text());
    } catch (error) {
        console.error('AI Error:', error.message);
    }
}

testGemini3();
