const { createAccount } = require('../adapter/accountAdapter');
const Account = require('../models/accountModel');
const User = require('../models/userModel');
require("dotenv").config();
const { getNibssToken }  = require('../token')


exports.createUserAccount = async (req, res) => {
  try {
const { kycID, dob } = req.body;

if (!kycID || !dob) {
  return res.status(400).json({ message: "BVN and DOB are required" });
}

const bvn = String(kycID).trim();
const user = await User.findOne({ bvn });


if (!user) {
  return res.status(404).json({ message: "User not found" });
}

const token = await getNibssToken();

const apiResponse = await createAccount({
  payload: {
    kycType: "bvn",
    kycID: bvn,
    dob
  },
  token
});

    const accountData = apiResponse.account;

if (!accountData || !accountData.accountNumber) {
  throw new Error("Account number missing from API response");
}

const account = await Account.create({
  userId: user._id,
  accountNumber: accountData.accountNumber,
  bankCode: accountData.bankCode,
  bankName: apiResponse.bankName || "YIN Bank",
  balance: accountData.balance,
  transactionId: result.transactionId,


  kycType: "bvn",
  kycID: bvn,
  dob,
  firstName: user.firstName,
  lastName: user.lastName
});


    await User.findByIdAndUpdate(user._id, {
      hasAccount: true,
      isVerified: true,
      accountId: account._id
    });

    return res.status(201).json({
      message: "Account created successfully",
      account
    });

  } catch (error) {
  ( error.message);

    return res.status(500).json({
      message: "Failed to create account",
      error: error.message
    });
  }
};


exports.getAllAccounts = async (req, res) => {

  try {
    const accounts = await Account.find()
      .populate("userId", "firstName lastName email bvn")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Accounts fetched successfully",
      count: accounts.length,
      accounts
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch accounts",
      error: error.message
    });
  }
};

