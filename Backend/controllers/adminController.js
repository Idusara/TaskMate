const User = require('../models/User');
const Tasker = require('../models/Tasker');
const Booking = require('../models/Booking');

// @desc    Get overall statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
exports.getStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalTaskers = await Tasker.countDocuments();
        const totalBookings = await Booking.countDocuments();

        const recentBookings = await Booking.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('user', 'name email')
            .populate('tasker', 'category');

        const recentUsers = await User.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('-password');

        res.status(200).json({
            stats: {
                totalUsers,
                totalTaskers,
                totalBookings
            },
            recentBookings,
            recentUsers
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
