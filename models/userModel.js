const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
 firstName:{type:String, required:true},
 lastName:{type:String, required:true},
 email:{type:String,required:true, unique:true},
  bvn: { type: String, unique: true, sparse: true },
  nin: { type: String, unique: true, sparse: true },
 isVerified: { type: Boolean, default: false},
 hasAccount: { type: Boolean, default: false },
 createdAt: { type: Date, default: Date.now}
});




     
module.exports = mongoose.model("User", userSchema);
    
