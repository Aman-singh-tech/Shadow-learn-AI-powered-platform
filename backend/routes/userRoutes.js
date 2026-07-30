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

const multer = require('multer');
const path = require('path');

// Configure Multer for local storage
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${req.user._id}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter(req, file, cb) {
        const filetypes = /jpeg|jpg|png|webp|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'));
        }
    }
});

// @desc    Upload user profile picture
// @route   POST /api/users/profile-picture
// @access  Private
router.post('/profile-picture', protect, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image uploaded' });
        }

        // The file is saved to 'uploads/'. We just need to save the relative path to db
        const imagePath = `/uploads/${req.file.filename}`;

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.profilePicture = imagePath;
        await user.save();

        res.status(200).json({
            message: 'Profile picture updated successfully',
            profilePicture: user.profilePicture
        });
    } catch (error) {
        res.status(400).json({ error: error.message || 'Server Error uploading image' });
    }
});

module.exports = router;
