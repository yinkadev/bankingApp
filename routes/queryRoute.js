const express = require("express");
const router = express.Router();

const {
  getTransactionStatus,
} = require("../controllers/queryTranscationController");

router.get("/transaction/:transactionId", getTransactionStatus);

module.exports = router;