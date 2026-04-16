const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API client with official SDK
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateContent = async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        // Using gemini-3-flash-preview (verified active for 2026)
        const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.status(200).json({
            success: true,
            result: text,
        });
    } catch (error) {
        console.error('Error in AI integration:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to generate response from AI tool',
            details: error.message
        });
    }
};

module.exports = {
    generateContent
};
