const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    workflows: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workflow'
    }],
    thumbnail: {
        type: String,
        default: ''
    },
    difficulty: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Beginner'
    },
    tags: [{
        type: String,
        trim: true
    }],
    isPublic: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Module = mongoose.model('Module', moduleSchema);
module.exports = Module;
