const Solution = require('../models/Solution');

// @desc    Get all solutions
// @route   GET /api/solutions
// @access  Public (or Private based on requirement, let's say Private)
const getSolutions = async (req, res) => { 
    try {
        const solutions = await Solution.find()
            .populate('expert', 'name')
            .populate('workflowContext', 'title')         
            .sort({ createdAt: -1 });

        res.status(200).json(solutions);
    } catch (error) {
        res.status(500).json({ error: 'Server Error getting solutions' });
    }
};

// @desc    Create a new solution
// @route   POST /api/solutions
// @access  Private
const createSolution = async (req, res) => {
    try {
        const { title, content, tags, workflowContext, aiAssisted } = req.body;

        if (!title || !content) {
            return res.status(400).json({ error: 'Please add a title and content to the solution' });
        }

        const solution = await Solution.create({
            title,
            content,
            tags,
            workflowContext,
            aiAssisted,
            expert: req.user.id
        });

        res.status(201).json(solution);
    } catch (error) {
        console.error('Error creating solution:', error);
        res.status(500).json({ error: 'Failed to create solution' });
    }
};

// @desc    Upvote a solution
// @route   PUT /api/solutions/:id/upvote
// @access  Private
const upvoteSolution = async (req, res) => {
    try {
        const solution = await Solution.findById(req.params.id);

        if (!solution) {
            return res.status(404).json({ error: 'Solution not found' });
        }

        // Increment upvotes
        solution.upvotes += 1;
        await solution.save();

        res.status(200).json(solution);
    } catch (error) {
        res.status(500).json({ error: 'Failed to upvote solution' });
    }
};

module.exports = {
    getSolutions,
    createSolution,
    upvoteSolution
};
