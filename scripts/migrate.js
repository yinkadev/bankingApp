require("dotenv").config();
const mongoose = require("mongoose");

const Account = require("../models/accountModel");

const migrate = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Running migration...");

    const accounts = await Account.find();

    for (let acc of accounts) {
      if (!acc.balance) {
        acc.balance = 0;
      }

      if (!acc.accountNumber) {
        acc.accountNumber = Math.floor(
          1000000000 + Math.random() * 9000000000
        ).toString();
      }

      await acc.save();
    }

    console.log("✅ Migration complete");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

migrate();