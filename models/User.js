const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  names: { type: String},
  eMail: { type: String},
  urlImage: { type: String},
  description: { type: String},
  address: { type: String},
  password: {type: String},
});

const User = mongoose.model("user", UserSchema);
module.exports = User;




