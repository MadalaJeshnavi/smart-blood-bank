const mongoose = require("mongoose");

const emergencySchema = new mongoose.Schema({
  patientName: String,
  bloodGroup: String,
  hospital: String,
  contact: String,
  status: { type: String, default: "Pending" }
});

module.exports = mongoose.model("Emergency", emergencySchema);
