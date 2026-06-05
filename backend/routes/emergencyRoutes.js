const express = require("express");
const Emergency = require("../models/emergency");
const nodemailer = require("nodemailer");

const router = express.Router();

// Create emergency request
router.post("/create", async (req, res) => {
  try {
    const emergency = new Emergency(req.body);
    await emergency.save();

    // Send email notification if configured
    if (process.env.EMAIL && process.env.PASSWORD) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        }
      });

      await transporter.sendMail({
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: `Emergency Blood Needed - ${req.body.bloodType}`,
        text: `Urgent ${req.body.bloodType} blood required!\n\nHospital: ${req.body.hospital}\nUnits: ${req.body.units}\nUrgency: ${req.body.urgency}\nContact: ${req.body.contact}\n\nMessage: ${req.body.message || 'N/A'}`
      });
    }

    res.json({ message: "Emergency request submitted successfully!", emergency });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all emergency requests
router.get("/", async (req, res) => {
  try {
    const data = await Emergency.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update emergency status
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const emergency = await Emergency.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(emergency);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
