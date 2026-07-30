const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('../config/config');

// Gemini API key validation is handled inside generateContent

// NOTE: Gemini client will be instantiated inside the request handler after validating the API key
const generateContent = async (req, res) => {
    try {
        const { prompt } = req.body;
        console.log('AI request received with prompt:', prompt);
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }


        // Using gemini-1.5-flash (stable and production-ready)
        if (!config.GEMINI_API_KEY) {
            console.error('GEMINI_API_KEY not set');
            return res.status(500).json({ success: false, error: 'Gemini API key not configured' });
        }
        // Instantiate Gemini client now that we have a valid key
        const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });
        
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        res.status(200).json({
            success: true,
            result: text,
        });
    } catch (error) {
        console.error('AI generation error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to generate AI response',
            details: error.message,
            // Optionally include stack for debugging in development
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        });
    }
};

module.exports = {
    generateContent
};
