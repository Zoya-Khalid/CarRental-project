const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  booking_id: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
  amount: Number,
  payment_date: { type: Date, default: Date.now },
  method: String, // e.g., 'card', 'cash'
  payment_status: { type: String, default: "pending" },
});

module.exports = mongoose.model("Payment", paymentSchema, "Payment");
