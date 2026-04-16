const mongoose = require('mongoose');
const Handoff = require('../models/Handoff');
const User = require('../models/User');
const Workflow = require('../models/Workflow');
require('dotenv').config({ path: './.env' });

async function seedHandoffs() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected for handoff seeding...');

        const babu = await User.findOne({ name: 'babu' });
        const admin = await User.findOne({ role: 'Admin' }) || await User.findOne({ name: 'Test Expert' });
        const workflows = await Workflow.find().limit(3);

        if (!babu || workflows.length === 0) {
            console.error('Core data missing (babu or workflows).');
            process.exit(1);
        }

        await Handoff.deleteMany({});
        console.log('Cleared existing handoffs.');

        const seedData = [
            {
                workflow: workflows[0]._id,
                assignedTo: babu._id,
                assignedBy: admin._id,
                status: 'pending',
                notes: 'Babu, please review this authentication flow and sync the neural documentation.'
            },
            {
                workflow: workflows[1 % workflows.length]._id,
                assignedTo: babu._id,
                assignedBy: admin._id,
                status: 'in-progress',
                notes: 'Critical: Optimize images for this deployment. Check the latest Docker node.'
            }
        ];

        await Handoff.insertMany(seedData);
        console.log('Successfully seeded handoffs for Babu!');
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
}

seedHandoffs();
