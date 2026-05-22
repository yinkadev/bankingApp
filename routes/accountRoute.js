const express = require('express');
const router = express.Router();
const {verifyNibssToken} = require("../middleware/verifyNibssToken");

const {
  createUserAccount,
  getAllAccounts
} = require('../controllers/accountController');

router.post('/create', verifyNibssToken,createUserAccount);

router.get('/all',verifyNibssToken, getAllAccounts);

module.exports = router;


