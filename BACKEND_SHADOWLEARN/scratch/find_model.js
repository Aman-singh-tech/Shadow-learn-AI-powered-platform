const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: './.env' });

async function listModels() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    try {
        console.log('Listing available models...');
        // Official way to list models is via the fetch or special method, 
        // but often we just need to find the right name.
        // Let's try a few known names if listing fails.
        const models = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-2.0-flash-exp", "gemini-2.0-flash"];
        
        for (const name of models) {
            try {
                const model = genAI.getGenerativeModel({ model: name });
                await model.generateContent("test");
                console.log(`✅ Model ${name} is working!`);
                return;
            } catch (e) {
                console.log(`❌ Model ${name} failed: ${e.message}`);
            }
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

listModels();
