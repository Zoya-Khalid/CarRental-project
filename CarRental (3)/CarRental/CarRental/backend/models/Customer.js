// models/Customer.js
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  phone_number: String,
  address: String,
});

module.exports = mongoose.model("Customer", customerSchema, "Customer");
// Collection will be 'customers'
