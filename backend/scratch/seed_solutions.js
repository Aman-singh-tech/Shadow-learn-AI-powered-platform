const mongoose = require('mongoose');
const Solution = require('../models/Solution');
const User = require('../models/User');
require('dotenv').config({ path: './.env' });

async function seedSolutions() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected for seeding solutions...');

        const babu = await User.findOne({ name: 'babu' });
        const testExpert = await User.findOne({ name: 'Test Expert' });

        if (!babu || !testExpert) {
            console.error('Users not found. Run seed_modules.js or create users first.');
            process.exit(1);
        }

        await Solution.deleteMany({});
        console.log('Cleared existing solutions.');

        const seedData = [
            {
                title: 'PostgreSQL Memory Leak Fix',
                content: 'Identified unclosed cursors in the reporting service. Resolved by wrapping database calls in a try-with-resources block using pg-pool.',
                tags: ['PostgreSQL', 'Database', 'Performance'],
                expert: testExpert._id,
                upvotes: 45
            },
            {
                title: 'JWT Refresh Token Strategy',
                content: 'Implemented a sliding window expiration for refresh tokens to balance security and UX. Tokens are rotated on every use.',
                tags: ['Security', 'Auth', 'NodeJS'],
                expert: babu._id,
                upvotes: 89
            },
            {
                title: 'Docker Image Size Optimization',
                content: 'Switched from node:latest to node:alpine and implemented multi-stage builds. Reduced image size from 1.2GB to 140MB.',
                tags: ['Docker', 'DevOps', 'Cloud'],
                expert: babu._id,
                upvotes: 32
            }
        ];

        await Solution.insertMany(seedData);
        console.log('Successfully seeded solutions linked to Babu and Test Expert!');
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
}

seedSolutions();
