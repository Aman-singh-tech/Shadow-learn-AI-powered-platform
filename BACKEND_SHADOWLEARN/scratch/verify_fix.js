require('dotenv').config({ path: './.env' });
const { generateContent } = require('../controllers/aiController');

// Mock req and res
const req = {
    body: { prompt: "Explain the concept of 'Shadow Learning' in one sentence." }
};

const res = {
    status: function(code) {
        this.statusCode = code;
        return this;
    },
    json: function(data) {
        console.log('Status Code:', this.statusCode);
        console.log('Response Data:', JSON.stringify(data, null, 2));
    }
};

console.log('Testing updated aiController.js...');
generateContent(req, res);
