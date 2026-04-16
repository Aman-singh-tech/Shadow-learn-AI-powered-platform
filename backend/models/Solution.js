const mongoose = require('mongoose');

const solutionSchema = new mongoose.Schema({
    expert: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    workflowContext: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workflow'
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        trim: true
    }],
    aiAssisted: {
        type: Boolean,
        default: false
    },
    upvotes: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Solution = mongoose.model('Solution', solutionSchema);
module.exports = Solution;
