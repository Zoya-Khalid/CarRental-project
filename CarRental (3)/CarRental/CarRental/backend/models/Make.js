const mongoose = require("mongoose");

const makeSchema = new mongoose.Schema({
  name: String,
  country_of_origin: String,
  founded_year: Number,
});

module.exports = mongoose.model("Make", makeSchema, "Make");
