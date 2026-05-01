const express = require('express');
const router = express.Router();
const { accountNameEnquiry } = require('../controllers/inquiryController');

router.get('/name-enquiry/:accountNumber', accountNameEnquiry);

module.exports = router;