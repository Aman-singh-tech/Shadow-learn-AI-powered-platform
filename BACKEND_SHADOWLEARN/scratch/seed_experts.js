const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config({ path: './.env' });

async function upgradeToExperts() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected for expert upgrades...');

        // 1. Upgrade 'babu'
        await User.findOneAndUpdate(
            { name: 'babu' },
            { 
                role: 'Expert',
                experience: 'Senior Neural Architect',
                skills: ['React', 'NodeJS', 'MongoDB', 'Gemini AI'],
                rating: 4.9,
                neuralCapacity: 154
            }
        );

        // 2. Upgrade 'Test Expert'
        await User.findOneAndUpdate(
            { name: 'Test Expert' },
            { 
                role: 'Specialist',
                experience: 'DevOps Lead',
                skills: ['Docker', 'Kubernetes', 'AWS', 'Security'],
                rating: 4.7,
                neuralCapacity: 132
            }
        );

        // 3. Create a new expert if needed
        const sarah = await User.findOne({ email: 'sarah@example.com' });
        if (!sarah) {
            await User.create({
                name: 'Sarah Johnson',
                email: 'sarah@example.com',
                password: 'password123',
                role: 'Expert',
                experience: 'Product Strategy Lead',
                skills: ['Product Mgmt', 'UI/UX', 'Team Leadership'],
                rating: 4.8
            });
        }

        console.log('Successfully upgraded users to Expert status!');
        process.exit(0);
    } catch (error) {
        console.error('Upgrade failed:', error);
        process.exit(1);
    }
}

upgradeToExperts();
