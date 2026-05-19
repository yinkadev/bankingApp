require("dotenv").config();
const mongoose = require("mongoose");

const User = require("../models/userModel");
const Account = require("../models/accountModel");
const Transaction = require("../models/transcationModel");

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Clear existing data
    await Transaction.deleteMany();
    await Account.deleteMany();
    await User.deleteMany();

    // Create Users
    const users = await User.insertMany([
      {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        bvn: "12345678901",
        isVerified: true,
        hasAccount: true
      },
      {
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@example.com",
        bvn: "10987654321",
        isVerified: true,
        hasAccount: true
      }
    ]);

    // Create Accounts
    const accounts = await Account.insertMany([
      {
        accountNumber: "1234567890",
        balance: 15000,
        kycType: "bvn",
        kycID: users[0].bvn,
        dob: "1995-01-01",
        firstName: users[0].firstName,
        lastName: users[0].lastName,
        userId: users[0]._id
      },
      {
        accountNumber: "9876543210",
        balance: 20000,
        kycType: "bvn",
        kycID: users[1].bvn,
        dob: "1998-05-10",
        firstName: users[1].firstName,
        lastName: users[1].lastName,
        userId: users[1]._id
      }
    ]);

    //  Create Transaction
    await Transaction.insertMany([
      {
        from: accounts[0].accountNumber,
        to: accounts[1].accountNumber,
        amount: 5000,
        narration: "Test transfer",
        transactionId: "TXN123456",
        status: "success"
      }
    ]);

    console.log(" Database seeded successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();