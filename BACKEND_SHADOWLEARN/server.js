const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const aiRoutes = require('./routes/aiRoutes');
const authRoutes = require('./routes/authRoutes');
const workflowRoutes = require('./routes/workflowRoutes');
const handoffRoutes = require('./routes/handoffRoutes');
const solutionRoutes = require('./routes/solutionRoutes');
const moduleRoutes = require('./routes/moduleRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const userRoutes = require('./routes/userRoutes');
const insightRoutes = require('./routes/insightRoutes');

app.use('/api/ai', aiRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/workflows', workflowRoutes);
app.use('/api/handoffs', handoffRoutes);
app.use('/api/solutions', solutionRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/users', userRoutes);
app.use('/api/insights', insightRoutes);

// Health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Backend is running' });
});

// Error handling middleware
const { errorHandler } = require('./middleware/errorMiddleware');
app.use(errorHandler);

// MongoDB Connection
const defaultUri = 'mongodb+srv://aman-singh-tech:1kC24zlcNOaUenNW@cluster0.twdd1vv.mongodb.net/Shadowlearn';
mongoose.connect(process.env.MONGODB_URI || defaultUri, {
    serverSelectionTimeoutMS: 50000, 
    socketTimeoutMS: 45000
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
