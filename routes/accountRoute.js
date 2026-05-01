const express = require('express');
const router = express.Router();

const {
  createUserAccount,
  getAllAccounts
} = require('../controllers/accountController');

router.post('/create', createUserAccount);

router.get('/all', getAllAccounts);

module.exports = router;