const express = require('express');
const router = express.Router();
const { getBookings, getHistory, getRecommendations } = require('../controllers/userController');

router.get('/bookings', getBookings);
router.get('/history', getHistory);
router.get('/recommendations', getRecommendations);

module.exports = router;
