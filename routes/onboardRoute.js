

const express = require('express');
const router = express.Router();
const { onboardUser } = require('../controllers/onboardController');

router.post('/onboard', onboardUser);

module.exports = router;