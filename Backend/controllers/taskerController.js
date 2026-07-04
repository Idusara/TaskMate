const Tasker = require('../models/Tasker');

// @desc    Get all taskers
// @route   GET /api/taskers
// @access  Public
exports.getTaskers = async (req, res) => {
    try {
        const taskers = await Tasker.find().populate('user', 'name email');
        res.status(200).json(taskers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a tasker profile
// @route   POST /api/taskers
// @access  Private
exports.createTasker = async (req, res) => {
    try {
        req.body.user = req.user.id; // Assume middleware sets req.user

        const tasker = await Tasker.create(req.body);
        res.status(201).json(tasker);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
