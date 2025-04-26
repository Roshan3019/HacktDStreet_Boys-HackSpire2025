const express = require('express');
const router = express.Router();
const { getOverview, getAlerts, getPerformance } = require('../controllers/adminController');

router.get('/overview', getOverview);
router.get('/alerts', getAlerts);
router.get('/performance', getPerformance);

module.exports = router;
