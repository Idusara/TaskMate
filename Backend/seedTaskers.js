const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const Tasker = require('./models/Tasker');

const TASKERS = [
  {
    name: 'Alex Mercer',
    email: 'alex@taskmate.com',
    password: 'password',
    avatarColor: 'hsl(180, 70%, 40%)',
    rating: 4.9,
    reviewsCount: 148,
    rate: 38,
    categories: ['assembly', 'mounting'],
    bio: 'Punctual and detail-oriented assembly expert. I bring my own professional power tools and guarantee tidy work.',
    completedCount: 215,
    isElite: true
  },
  {
    name: 'Sarah Jenkins',
    email: 'sarah@taskmate.com',
    password: 'password',
    avatarColor: 'hsl(340, 75%, 60%)',
    rating: 5.0,
    reviewsCount: 94,
    rate: 32,
    categories: ['cleaning'],
    bio: 'Professional house cleaner. Friendly, meticulous, and eco-friendly. Specialty in deep cleaning kitchen & washrooms.',
    completedCount: 130,
    isElite: true
  },
  {
    name: 'Michael Chen',
    email: 'michael@taskmate.com',
    password: 'password',
    avatarColor: 'hsl(210, 80%, 45%)',
    rating: 4.8,
    reviewsCount: 182,
    rate: 45,
    categories: ['mounting', 'repairs'],
    bio: 'Handyman with 6+ years experience. TV wall mounting, floating shelves, faucet leaks, and drywalls fixed easily.',
    completedCount: 310,
    isElite: false
  },
  {
    name: 'Emily Rodriguez',
    email: 'emily@taskmate.com',
    password: 'password',
    avatarColor: 'hsl(45, 90%, 45%)',
    rating: 4.9,
    reviewsCount: 76,
    rate: 35,
    categories: ['assembly', 'outdoor'],
    bio: 'Love gardening and helping families build their new desks & cribs. Reliable, fast, and happy to assist.',
    completedCount: 98,
    isElite: false
  },
  {
    name: 'Marcus Vance',
    email: 'marcus@taskmate.com',
    password: 'password',
    avatarColor: 'hsl(120, 50%, 35%)',
    rating: 4.7,
    reviewsCount: 110,
    rate: 40,
    categories: ['moving', 'outdoor'],
    bio: 'Strong helper with a large utility truck. Perfect for yard cleanup, furniture hauling, and heavy lifting.',
    completedCount: 154,
    isElite: false
  },
  {
    name: 'Chloe Sinclair',
    email: 'chloe@taskmate.com',
    password: 'password',
    avatarColor: 'hsl(280, 75%, 55%)',
    rating: 5.0,
    reviewsCount: 42,
    rate: 55,
    categories: ['repairs', 'trending'],
    bio: 'Smart home engineer. Certified electrician. TV mounting, smart thermostat installs, and customized routing setups.',
    completedCount: 52,
    isElite: true
  }
];

const seedTaskers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    for (let t of TASKERS) {
      const existingUser = await User.findOne({ email: t.email });
      if (!existingUser) {
        // Create user
        const user = await User.create({
          name: t.name,
          email: t.email,
          password: t.password,
          role: 'tasker'
        });
        
        // Create tasker profile
        await Tasker.create({
          user: user._id,
          name: t.name,
          bio: t.bio,
          categories: t.categories,
          hourlyRate: t.rate,
          skills: t.categories,
          rating: t.rating,
          reviewsCount: t.reviewsCount,
          completedTasks: t.completedCount,
          isElite: t.isElite,
          avatarColor: t.avatarColor
        });
        console.log(`Created tasker: ${t.name}`);
      } else {
        console.log(`Tasker ${t.name} already exists. Skipping.`);
      }
    }

    console.log('Taskers seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding taskers:', error);
    process.exit(1);
  }
};

seedTaskers();
