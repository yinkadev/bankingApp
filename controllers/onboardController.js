const User = require("../models/userModel");
const { validateBvn } = require("../adapter/onboardingAdapter");

exports.onboardUser = async (req, res) => {
  try {
    const { bvn, email, firstName, lastName, dob } = req.body;

    if (!bvn || !email || !firstName || !lastName || !dob) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const response = await validateBvn(bvn);

    const isValid =
      response?.status === true ||
      response?.message?.toLowerCase()?.includes("successful");

    if (!isValid) {
      return res.status(400).json({ message: "Invalid BVN" });
    }

    const existingUser = await User.findOne({ bvn });

    if (existingUser) {
      return res.status(400).json({ message: "User already onboarded" });
    }

    const user = await User.create({
      bvn,
      email,
      firstName,
      lastName,
      dob,
      hasAccount: false,
      isVerified: true
    });

    return res.status(201).json({
      message: "User onboarded successfully",
      user
    });

  } catch (error) {
  
    return res.status(500).json({
      message: "Onboarding failed",
      error: error.message
    });
  }
};