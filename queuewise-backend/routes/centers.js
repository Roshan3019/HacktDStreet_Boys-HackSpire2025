const express = require('express');
const router = express.Router();
const { getCenters } = require('../controllers/centersController');

router.get('/', getCenters);

module.exports = router;
