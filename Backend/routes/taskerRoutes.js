const express = require('express');
const router = express.Router();
const { getTaskers, createTasker } = require('../controllers/taskerController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(getTaskers)
    .post(protect, createTasker);

module.exports = router;
