const express = require("express");
const Emergency = require("../models/emergency");
const nodemailer = require("nodemailer");

const router = express.Router();

router.post("/create", async (req, res) => {
  const emergency = new Emergency(req.body);
  await emergency.save();

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
    subject: "Emergency Blood Needed",
    text: `Urgent ${req.body.bloodGroup} blood required`
  });

  res.json({ message: "Emergency Sent & Email Notified" });
});

router.get("/", async (req, res) => {
  const data = await Emergency.find();
  res.json(data);
});

module.exports = router;
