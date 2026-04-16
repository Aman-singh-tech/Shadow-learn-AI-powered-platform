const mongoose = require('mongoose');
const Module = require('../models/Module');
const Workflow = require('../models/Workflow');
const User = require('../models/User');
require('dotenv').config({ path: './.env' });

async function seedModules() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        // 1. Get an existing user for the instructor
        const user = await User.findOne();
        if (!user) {
            console.log('No user found. Please create a user first.');
            process.exit(1);
        }

        // 2. Get some workflows
        const workflows = await Workflow.find().limit(3);
        const workflowIds = workflows.map(w => w._id);

        if (workflowIds.length === 0) {
            console.log('No workflows found. Using empty array.');
        }

        // 3. Clear existing modules
        await Module.deleteMany({});
        console.log('Cleared existing modules.');

        // 4. Create new modules
        const seedData = [
            {
                title: 'Security Essentials',
                description: 'Master mission-critical security tasks using pre-recorded expert workflows.',
                instructor: user._id,
                workflows: workflowIds,
                difficulty: 'Beginner',
                tags: ['Security', 'DevOps']
            },
            {
                title: 'Advanced CRM Mastery',
                description: 'Deep dive into CRM automation and client management paths.',
                instructor: user._id,
                workflows: workflowIds.slice(0, 1),
                difficulty: 'Intermediate',
                tags: ['CRM', 'Productivity']
            },
            {
                title: 'Database Reliability Engineering',
                description: 'Operational paths for maintaining high-availability database clusters.',
                instructor: user._id,
                workflows: workflowIds.slice(1, 2),
                difficulty: 'Advanced',
                tags: ['Database', 'SRE']
            }
        ];

        await Module.insertMany(seedData);
        console.log('Successfully seeded 3 modules!');
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
}

seedModules();
