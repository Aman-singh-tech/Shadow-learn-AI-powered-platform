const Handoff = require('../models/Handoff');

// @desc    Get all handoffs for logged in user (assigned to or by them)
// @route   GET /api/handoffs
// @access  Private
const getHandoffs = async (req, res) => {
    try {
        const handoffs = await Handoff.find({ 
            $or: [{ assignedTo: req.user.id }, { assignedBy: req.user.id }] 
        }).populate('workflow', 'title').populate('assignedBy', 'name').populate('assignedTo', 'name')
          .sort({ createdAt: -1 });

        res.status(200).json(handoffs);
    } catch (error) {
        res.status(500).json({ error: 'Server Error getting handoffs' });
    }
};

// @desc    Create a new handoff
// @route   POST /api/handoffs
// @access  Private
const createHandoff = async (req, res) => {
    try {
        const { workflow, assignedTo, notes } = req.body;

        if (!workflow || !assignedTo) {
            return res.status(400).json({ error: 'Please provide workflow and assignee' });
        }

        const handoff = await Handoff.create({
            workflow,
            assignedTo,
            assignedBy: req.user.id,
            notes
        });

        res.status(201).json(handoff);
    } catch (error) {
        console.error('Error creating handoff:', error);
        res.status(500).json({ error: 'Failed to create handoff' });
    }
};

// @desc    Update handoff status
// @route   PUT /api/handoffs/:id
// @access  Private
const updateHandoff = async (req, res) => {
    try {
        const handoff = await Handoff.findById(req.params.id);

        if (!handoff) {
            return res.status(404).json({ error: 'Handoff not found' });
        }

        // Only assigned To or assigned By can modify it
        if (handoff.assignedTo.toString() !== req.user.id && handoff.assignedBy.toString() !== req.user.id) {
            return res.status(401).json({ error: 'Not authorized to update this handoff' });
        }

        const updatedHandoff = await Handoff.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedHandoff);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update handoff' });
    }
};

module.exports = {
    getHandoffs,
    createHandoff,
    updateHandoff
};
