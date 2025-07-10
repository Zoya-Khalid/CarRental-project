const mongoose = require("mongoose");

const transmissionTypeSchema = new mongoose.Schema({
  name: String,
  description: String,
});

module.exports = mongoose.model("TransmissionType", transmissionTypeSchema, "Transmission_Type");
