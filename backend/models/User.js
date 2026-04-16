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
        required: true
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
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
