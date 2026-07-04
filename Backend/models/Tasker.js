const mongoose = require('mongoose');

const taskerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    name: String, // Store name directly for easy access
    category: {
        type: String,
        default: 'general'
    },
    categories: [String],
    skills: {
        type: [String],
        required: true
    },
    hourlyRate: {
        type: Number,
        required: [true, 'Please add an hourly rate']
    },
    rating: {
        type: Number,
        default: 0
    },
    reviews: {
        type: Number,
        default: 0
    },
    reviewsCount: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: ''
    },
    bio: String,
    completedTasks: {
        type: Number,
        default: 0
    },
    completedCount: {
        type: Number,
        default: 0
    },
    isElite: {
        type: Boolean,
        default: false
    },
    avatarColor: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Tasker', taskerSchema);
