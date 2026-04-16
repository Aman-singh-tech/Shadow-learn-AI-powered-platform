const mongoose = require('mongoose');

const stepSchema = new mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    timestamp: { type: String },
    type: { type: String, enum: ['click', 'input', 'navigate', 'scroll', 'custom'], default: 'custom' },
    target: { type: String } // e.g. CSS selector or element name
});

const workflowSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    videoUrl: {
        type: String,
        default: ''
    },
    tags: [{
        type: String,
        trim: true
    }],
    steps: [stepSchema],
    isPublic: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Workflow = mongoose.model('Workflow', workflowSchema);
module.exports = Workflow;
