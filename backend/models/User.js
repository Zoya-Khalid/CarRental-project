const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  phone_number: String,
  address: String,
  role:String,
}); 

module.exports = mongoose.model("User", UserSchema, "User");