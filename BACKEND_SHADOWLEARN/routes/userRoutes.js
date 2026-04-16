const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

// @desc    Get all users with expert profiles
// @route   GET /api/users/experts
// @access  Private
router.get('/experts', protect, async (req, res) => {
    try {
        const experts = await User.find({ 
            role: { $in: ['Expert', 'Specialist', 'Admin'] } 
        }).select('-password');
        
        res.status(200).json(experts);
    } catch (error) {
        res.status(500).json({ error: 'Server Error fetching experts' });
    }
});

module.exports = router;
