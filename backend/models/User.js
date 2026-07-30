const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: false // Optional for users logging in via Google
    },
    googleId: {
        type: String,
        required: false,
        unique: true,
        sparse: true // Allows multiple null values for normal registered users
    },
    role: {
        type: String,
        enum: ['Expert', 'Specialist', 'Junior', 'Admin'],
        default: 'Junior'
    },
    experience: {
        type: String,
        default: 'Junior Specialist'
    },
    skills: [{
        type: String,
        trim: true
    }],
    rating: {
        type: Number,
        default: 4.5
    },
    neuralCapacity: {
        type: Number,
        default: 100
    },
    profilePicture: {
        type: String,
        default: ''
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
