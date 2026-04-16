const Workflow = require('../models/Workflow');
const Solution = require('../models/Solution');
const User = require('../models/User');

// @desc    Get aggregated organizational insights
// @route   GET /api/insights
// @access  Private
const getInsights = async (req, res) => {
    try {
        const totalWorkflows = await Workflow.countDocuments();
        const totalSolutions = await Solution.countDocuments();
        const totalExperts = await User.countDocuments({ role: { $in: ['Expert', 'Specialist'] } });

        // Calculate trends (comparing to last month)
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);

        const recentWorkflows = await Workflow.countDocuments({ createdAt: { $gt: lastMonth } });
        const recentSolutions = await Solution.countDocuments({ createdAt: { $gt: lastMonth } });

        // Mock deterministic data for aesthetic stats
        // In a real app, these would come from more complex analytics
        const documentedPercent = Math.min(Math.round((totalWorkflows / 20) * 100), 100);
        const timeSaved = totalSolutions * 4; // Assume each solution saves 4 hours
        
        const data = [
            { name: 'Jan', documented: 4 },
            { name: 'Feb', documented: 7 },
            { name: 'Mar', documented: 12 },
            { name: 'Apr', documented: totalWorkflows }, // Real data for current month
        ];

        res.status(200).json({
            stats: {
                undocumentedKnowledge: `${100 - documentedPercent}%`,
                productivityLoss: `${Math.max(50 - documentedPercent, 5)}%`,
                timeSaved: `${timeSaved}h`,
                learningVelocity: `${(recentWorkflows > 0 ? (recentWorkflows / totalWorkflows) * 10 : 1.2).toFixed(1)}x`
            },
            chartData: data,
            pieData: [
                { name: 'Documented', value: documentedPercent },
                { name: 'Undocumented', value: 100 - documentedPercent },
            ]
        });
    } catch (error) {
        console.error('Insights Error:', error);
        res.status(500).json({ error: 'Server Error calculating insights' });
    }
};

module.exports = { getInsights };
