const mongoose = require("mongoose");

const emergencySchema = new mongoose.Schema({
  bloodType: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
  },
  hospital: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  units: {
    type: Number,
    default: 1
  },
  urgency: {
    type: String,
    enum: ['normal', 'urgent', 'critical'],
    default: 'normal'
  },
  message: String,
  status: { 
    type: String, 
    default: "Pending",
    enum: ['Pending', 'Fulfilled', 'Cancelled']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Emergency", emergencySchema);
