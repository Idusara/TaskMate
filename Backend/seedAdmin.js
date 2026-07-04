const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/db');
require('dotenv').config();

const seedAdmin = async () => {
    try {
        await connectDB();

        // Check if admin already exists
        const adminExists = await User.findOne({ email: 'admin@admin.com' });
        if (adminExists) {
            console.log('Admin user already exists!');
            process.exit();
        }

        const adminUser = await User.create({
            name: 'admin',
            email: 'admin@admin.com',
            password: 'admin',
            role: 'admin'
        });

        console.log('Admin user created successfully!');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedAdmin();
