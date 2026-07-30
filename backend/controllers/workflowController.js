const Workflow = require('../models/Workflow');

// @desc    Get all workflows for logged in user
// @route   GET /api/workflows
// @access  Private
const getWorkflows = async (req, res) => {
    try {
        const workflows = await Workflow.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(workflows);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// @desc    Create a new workflow (recording)
// @route   POST /api/workflows
// @access  Private
const createWorkflow = async (req, res) => {
    try {
        const { title, description, tags, steps, isPublic } = req.body;
        
        let parsedTags = tags;
        if (typeof tags === 'string') {
             try { parsedTags = JSON.parse(tags); } catch (e) { parsedTags = tags.split(',').map(t => t.trim()); }
        }
        
        let parsedSteps = steps;
        if (typeof steps === 'string') {
             try { parsedSteps = JSON.parse(steps); } catch (e) { parsedSteps = []; }
        }

        if (!title) {
            return res.status(400).json({ error: 'Please add a title to the workflow' });
        }

        const videoUrl = req.file ? req.file.path : '';

        const workflow = await Workflow.create({
            title,
            description,
            tags: parsedTags,
            steps: parsedSteps,
            isPublic,
            videoUrl,
            user: req.user.id
        });

        res.status(201).json(workflow);
    } catch (error) {
        console.error('Error creating workflow:', error);
        res.status(500).json({ error: 'Failed to create workflow' });
    }
};

// @desc    Update a workflow
// @route   PUT /api/workflows/:id
// @access  Private
const updateWorkflow = async (req, res) => {
    try {
        const workflow = await Workflow.findById(req.params.id);

        if (!workflow) {
            return res.status(404).json({ error: 'Workflow not found' });
        }

        // Make sure the logged in user matches the workflow user
        if (workflow.user.toString() !== req.user.id) {
            return res.status(401).json({ error: 'User not authorized to update this workflow' });
        }

        const updatedWorkflow = await Workflow.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedWorkflow);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update workflow' });
    }
};

// @desc    Delete a workflow
// @route   DELETE /api/workflows/:id
// @access  Private
const deleteWorkflow = async (req, res) => {
    try {
        const workflow = await Workflow.findById(req.params.id);

        if (!workflow) {
            return res.status(404).json({ error: 'Workflow not found' });
        }

        // Make sure the logged in user matches the workflow user
        if (workflow.user.toString() !== req.user.id) {
            return res.status(401).json({ error: 'User not authorized to delete this workflow' });
        }

        await workflow.deleteOne();

        res.status(200).json({ id: req.params.id, message: 'Workflow deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete workflow' });
    }
};

module.exports = {
    getWorkflows,
    createWorkflow,
    updateWorkflow,
    deleteWorkflow
};
