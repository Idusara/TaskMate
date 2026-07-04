const express = require('express');
const router = express.Router();
const { getStats } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/stats')
    .get(protect, authorize('admin'), getStats);

module.exports = router;
