const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  car_id: { type: mongoose.Schema.Types.ObjectId, ref: "Car" },
  booking_start_date: Date,
  booking_end_date: Date,
  booking_status: { type: String, default: "pending" },
});

module.exports = mongoose.model("Booking", bookingSchema, "Booking");
