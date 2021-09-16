const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  names: { type: String},
  eMail: { type: String},
  urlImage: { type: String},
  description: { type: String},
  adress: { type: String},
  google: { type: Boolean,default: false},
  password: {type: String},
  userId: { type: mongoose.Types.ObjectId, ref: "user"},

});

const User = mongoose.model("user", UserSchema);
module.exports = User;




