const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  accountNumber: { type: String, unique: true },
  balance: { type: Number, default: 15000 },

  kycType: { type: String, enum: ['bvn', 'nin'], required: true },
  kycID: { type: String, required: true },
  dob: { type: String, required: true },

  firstName: { type: String },
  lastName: { type: String },

  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  accountId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Account"
},

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Account', accountSchema);
