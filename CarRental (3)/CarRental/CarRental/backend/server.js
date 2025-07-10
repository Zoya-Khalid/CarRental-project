const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Make = require("./models/Make");
const Model = require("./models/Model");
const TransmissionType = require("./models/TransmissionType");
const Car = require("./models/Car");
const Customer = require("./models/Customer");
const Booking = require("./models/Booking");
const Payment = require("./models/Payment");
const Color = require("./models/Color");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://233097:1234@saadjuttichor.pmqc0nk.mongodb.net/CarRentalDB?retryWrites=true&w=majority&appName=saadjuttichor", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Simple test route
app.get("/", (req, res) => {
  res.send("Car Rental Backend is running");
});

app.get("/colors", async (req, res) => {
  try {
    const colors = await Color.find();
    res.json(colors);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get all car makes
app.get("/makes", async (req, res) => {
  try {
    const makes = await Make.find();
    res.json(makes);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Add a new car make
app.post("/makes", async (req, res) => {
  try {
    const { name, country_of_origin, founded_year } = req.body;
    const make = new Make({ name, country_of_origin, founded_year });
    await make.save();
    res.json(make);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get all car models
app.get("/models", async (req, res) => {
  try {
    const models = await Model.find();
    res.json(models);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Add a new car model
app.post("/models", async (req, res) => {
  try {
    const { name, make_id, variant, engine_capacity, seating_capacity, body_type } = req.body;
    const model = new Model({ name, make_id, variant, engine_capacity, seating_capacity, body_type });
    await model.save();
    res.json(model);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get all transmission types
app.get("/transmissions", async (req, res) => {
  try {
    const transmissions = await TransmissionType.find();
    res.json(transmissions);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Add a new transmission type
app.post("/transmissions", async (req, res) => {
  try {
    const { name, description } = req.body;
    const transmission = new TransmissionType({ name, description });
    await transmission.save();
    res.json(transmission);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get all cars
app.get("/cars", async (req, res) => {
  try {
    const cars = await Car.find().populate("make_id").populate("model_id").populate("transmission_type_id");
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Add a new car
app.post("/cars", async (req, res) => {
  try {
    const data = req.body;
    const car = new Car(data);
    await car.save();
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update a car
app.put("/cars/:id", async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCar);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a car
app.delete("/cars/:id", async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get all customers
app.get("/customers", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get one customer by ID
app.get("/customers/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ error: "Customer not found" });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Add a new customer
app.post("/customers", async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ error: "Invalid data" });
  }
});

// Update a customer
app.put("/customers/:id", async (req, res) => {
  try {
    const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Customer not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a customer
app.delete("/customers/:id", async (req, res) => {
  try {
    const result = await Customer.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: "Customer not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get all bookings
app.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("Customer_id").populate("Car_id").populate("Car_Owner_id");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Add a new booking
app.post("/bookings", async (req, res) => {
  try {
    const data = req.body;
    const booking = new Booking(data);
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get all payments
app.get("/payments", async (req, res) => {
  try {
    const payments = await Payment.find().populate("booking_id").populate("customer_id");
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Add a new payment
app.post("/payments", async (req, res) => {
  try {
    const data = req.body;
    const payment = new Payment(data);
    await payment.save();
    res.json(payment);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
