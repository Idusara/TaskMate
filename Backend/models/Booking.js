const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    tasker: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tasker',
        required: true
    },
    taskDetails: {
        type: String,
        required: [true, 'Please provide task details']
    },
    scheduledDate: {
        type: Date,
        required: [true, 'Please provide a scheduled date']
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending'
    },
    address: {
        type: String,
        required: [true, 'Please provide an address']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Booking', bookingSchema);
