const Account = require("../models/accountModel");
const User = require("../models/userModel");

exports.accountNameEnquiry = async (req, res) => {
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

    if (!user) {
      return res.status(404).json({
        message: "User not found for this account"
      });
    }

    return res.status(200).json({
      accountNumber: account.accountNumber,
      accountName: `${user.firstName} ${user.lastName}`,
      bankName: account.bankName || "YIN Bank"
    });

  } catch (error) {
    return res.status(500).json({
      message: "Name enquiry failed",
      error: error.message
    });
  }
};