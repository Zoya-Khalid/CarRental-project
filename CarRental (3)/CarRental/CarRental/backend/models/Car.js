const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  owner_id: mongoose.Schema.Types.ObjectId, // optional for now
  make_id: { type: mongoose.Schema.Types.ObjectId, ref: "Make" },
  model_id: { type: mongoose.Schema.Types.ObjectId, ref: "Model" },
  transmission_type_id: { type: mongoose.Schema.Types.ObjectId, ref: "TransmissionType" },
  color: String,
  status: { type: String, default: "available" },
  manufacturing_year: Number,
  license_plate: String,
  mileage: Number,
  rental_rate_per_day: Number,
  location: String,
  condition_notes: String,
  image_url: String,
});

module.exports = mongoose.model("Car", carSchema, "Car");
