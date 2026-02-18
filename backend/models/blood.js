const mongoose = require("mongoose");

const bloodSchema = new mongoose.Schema({
  bloodGroup: String,
  unitsAvailable: Number
});

module.exports = mongoose.model("Blood", bloodSchema);
