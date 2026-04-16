const mongoose = require('mongoose');

const handoffSchema = new mongoose.Schema({
    workflow: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Workflow'
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    },
    notes: {
        type: String,
        trim: true
    },
    completedAt: {
        type: Date
    }
}, {
    timestamps: true
});

const Handoff = mongoose.model('Handoff', handoffSchema);
module.exports = Handoff;
