const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema({
  name: String,
  make_id: { type: mongoose.Schema.Types.ObjectId, ref: "Make" },
  variant: String,
  engine_capacity: String,
  seating_capacity: Number,
  body_type: String,
});

module.exports = mongoose.model("Model", modelSchema, "Model");
