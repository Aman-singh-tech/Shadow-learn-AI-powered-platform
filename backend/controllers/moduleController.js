const Module = require('../models/Module');

// @desc    Get all public modules
// @route   GET /api/modules
// @access  Private
const getModules = async (req, res) => {
    try {
        const modules = await Module.find({ isPublic: true })
            .populate('instructor', 'name')
            .populate('workflows', 'title duration videoUrl')
            .sort({ createdAt: -1 });
        res.status(200).json(modules);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// @desc    Get single module
// @route   GET /api/modules/:id
// @access  Private
const getModuleById = async (req, res) => {
    try {
        const moduleItem = await Module.findById(req.params.id)
            .populate('instructor', 'name')
            .populate('workflows');

        if (!moduleItem) {
            return res.status(404).json({ error: 'Module not found' });
        }

        res.status(200).json(moduleItem);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// @desc    Create a new module
// @route   POST /api/modules
// @access  Private
const createModule = async (req, res) => {
    try {
        const { title, description, workflows, difficulty, tags, isPublic } = req.body;

        if (!title || !description) {
            return res.status(400).json({ error: 'Please add a title and description' });
        }

        const newModule = await Module.create({
            title,
            description,
            instructor: req.user.id,
            workflows,
            difficulty,
            tags,
            isPublic
        });

        res.status(201).json(newModule);
    } catch (error) {
        console.error('Error creating module:', error);
        res.status(500).json({ error: 'Failed to create module' });
    }
};

// @desc    Update a module
// @route   PUT /api/modules/:id
// @access  Private
const updateModule = async (req, res) => {
    try {
        let moduleItem = await Module.findById(req.params.id);

        if (!moduleItem) {
            return res.status(404).json({ error: 'Module not found' });
        }

        // Check if user is instructor
        if (moduleItem.instructor.toString() !== req.user.id) {
            return res.status(401).json({ error: 'User not authorized to update this module' });
        }

        moduleItem = await Module.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json(moduleItem);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update module' });
    }
};

// @desc    Delete a module
// @route   DELETE /api/modules/:id
// @access  Private
const deleteModule = async (req, res) => {
    try {
        const moduleItem = await Module.findById(req.params.id);

        if (!moduleItem) {
            return res.status(404).json({ error: 'Module not found' });
        }

        if (moduleItem.instructor.toString() !== req.user.id) {
            return res.status(401).json({ error: 'User not authorized to delete this module' });
        }

        await moduleItem.deleteOne();

        res.status(200).json({ id: req.params.id, message: 'Module deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete module' });
    }
};

module.exports = {
    getModules,
    getModuleById,
    createModule,
    updateModule,
    deleteModule
};
