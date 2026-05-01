const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    from: { type: String, required: true },
    to: {type: String,  required: true },
   amount: {type: Number, required: true},
   narration: {  type: String},
  transactionId: { type: String},
    status: {type: String,default: "success" }
  },
  {timestamps: true});

module.exports = mongoose.model( "Transaction",transactionSchema);