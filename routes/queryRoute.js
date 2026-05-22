const express = require("express");
const router = express.Router();
const {verifyNibssToken} = require("../middleware/verifyNibssToken");

const {
  getTransactionStatus,
} = require("../controllers/queryTranscationController");

router.get("/transaction/:transactionId",verifyNibssToken, getTransactionStatus);

module.exports = router;