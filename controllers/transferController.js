const Account = require("../models/accountModel");
const Transaction = require("../models/transcation");
const { transferFunds } = require("../adapter/transferAdapter");


    exports.transfer = async (req, res) => {
  try {
    const { from, to, amount, narration } = req.body;

    if (!from || !to || !amount) {
      return res.status(400).json({
        message: "from, to and amount are required"
      });
    }

    const amt = Number(amount);

    if (amt <= 0) {
      return res.status(400).json({
        message: "Invalid amount"
      });
    }

    const sender = await Account.findOne({ accountNumber: from });

    if (!sender) {
      return res.status(404).json({
        message: "Sender account not found"
      });
    }

    const receiver = await Account.findOne({ accountNumber: to });

    if (!receiver) {
      return res.status(404).json({
        message: "Recipient account not found (Name Enquiry failed)"
      });
    }

    if (sender.balance < amt) {
      return res.status(400).json({
        message: "Insufficient funds"
      });
    }

    let apiResponse;

    try {
      apiResponse = await transferFunds({
        from,
        to,
        amount,
        narration
      });

    } catch (err) {
      return res.status(500).json({
        message: "Transfer failed",
        error: err.message
      });
    }
    const reference =
  apiResponse?.reference;

const transactionId = reference;

    sender.balance -= amt;
    await sender.save();

    receiver.balance += amt;
    await receiver.save();

  
   const transaction = await Transaction.create({
  from,
  to,
  amount: amt,
  narration,
  transactionId,
  status: "success"
});

  return res.status(200).json({
  message: "Transfer successful",
  transaction: {
    _id: transaction._id,
    from: transaction.from,
    to: transaction.to,
    amount: transaction.amount,
    narration: transaction.narration,
    transactionId: transaction.transactionId,
    status: transaction.status
  }
});

  } catch (error) {
    return res.status(500).json({
      message: "Transfer failed",
      error: error.message
    });
  }
};