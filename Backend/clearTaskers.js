const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const Tasker = require('./models/Tasker');

const clearTaskers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
    
    await Tasker.deleteMany({});
    console.log('All Taskers removed from the database.');
    
    // Optional: You could also delete users with role 'tasker'
    await User.deleteMany({ role: 'tasker' });
    console.log('All Tasker user accounts removed.');

    process.exit(0);
  } catch (error) {
    console.error('Error clearing taskers:', error);
    process.exit(1);
  }
};

clearTaskers();
