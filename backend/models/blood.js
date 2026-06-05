const mongoose = require("mongoose");

const bloodSchema = new mongoose.Schema({
  bloodType: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
  },
  location: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  },
  unitsAvailable: {
    type: Number,
    default: 1
  },
  donorName: {
    type: String,
    default: ''
  },
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  donorPhone: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Blood", bloodSchema);
