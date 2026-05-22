const express = require("express");
const router = express.Router();
const {verifyNibssToken} = require("../middleware/verifyNibssToken");
const { transfer } = require('../controllers/transferController');


router.post("/",verifyNibssToken, transfer);

module.exports = router;
