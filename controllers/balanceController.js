const Account = require("../models/accountModel");
const User = require("../models/userModel");

exports.getAccountBalance = async (req, res) => {
  try {
    const { accountNumber } = req.params;

    if (!accountNumber) {
      return res.status(400).json({
        message: "Account number is required"
      });
    }

    const cleanAccountNumber = String(accountNumber).trim();

  
    const account = await Account.findOne({
      accountNumber: cleanAccountNumber
    });

    if (!account) {
      return res.status(404).json({
        message: "Account not found"
      });
    }


    const user = await User.findById(account.userId);

    return res.status(200).json({
      accountNumber: account.accountNumber,
      balance: account.balance
   
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch balance",
      error: error.message
    });
  }
};