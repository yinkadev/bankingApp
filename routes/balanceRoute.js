const express = require("express");
const router = express.Router();

const { getAccountBalance } = require("../controllers/balanceController");

router.get('/:accountNumber', getAccountBalance);

module.exports = router;




