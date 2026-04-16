const Workflow = require('../models/Workflow');
const Solution = require('../models/Solution');
const Module = require('../models/Module');
const User = require('../models/User');

// @desc    Get dashboard stats and activity for the current user
// @route   GET /api/dashboard/stats
// @access  Private
const getDashboardStats = async (req, res) => {
    try {
        const userId = req.user.id;

        // 1. Basic Stats
        const workflowCount = await Workflow.countDocuments({ user: userId });
        const solutionCount = await Solution.countDocuments({ expert: userId });
        const moduleCount = await Module.countDocuments({ instructor: userId });
        const expertCount = await User.countDocuments(); // Global count

        // 2. Recent Activity (Mix of workflows and solutions)
        const recentWorkflows = await Workflow.find({ user: userId })
            .sort({ createdAt: -1 })
            .limit(5);
        
        const recentSolutions = await Solution.find({ expert: userId })
            .sort({ createdAt: -1 })
            .limit(5);

        // Combine and sort by date
        const activity = [
            ...recentWorkflows.map(w => ({
                id: w._id,
                title: w.title,
                type: 'workflow',
                action: 'recorded a workflow',
                time: w.createdAt,
            })),
            ...recentSolutions.map(s => ({
                id: s._id,
                title: s.title,
                type: 'solution',
                action: 'logged a solution',
                time: s.createdAt,
            }))
        ]
        .sort((a, b) => b.time - a.time)
        .slice(0, 5);

        // 3. Chart Data (Last 7 days)
        const chartData = [];
        const today = new Date();
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const startOfDay = new Date(date.setHours(0, 0, 0, 0));
            const endOfDay = new Date(date.setHours(23, 59, 59, 999));

            const dailyCount = await Workflow.countDocuments({
                user: userId,
                createdAt: { $gte: startOfDay, $lte: endOfDay }
            });

            chartData.push({
                name: date.toLocaleDateString('en-US', { weekday: 'short' }),
                count: dailyCount
            });
        }

        res.status(200).json({
            stats: {
                knowledgeCaptured: workflowCount,
                problemsSolved: solutionCount,
                modulesCreated: moduleCount,
                totalExperts: expertCount,
                timeSaved: workflowCount * 4, // Simple multiplier of 4 hours per capture
            },
            activity,
            chartData
        });

    } catch (error) {
        console.error('Dashboard Stats Error:', error);
        res.status(500).json({ error: 'Server Error while fetching dashboard stats' });
    }
};

module.exports = {
    getDashboardStats
};
