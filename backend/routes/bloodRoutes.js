const Blood = require("../models/blood");

module.exports = (io) => {
  const express = require("express");
  const router = express.Router();

  router.get("/", async (req, res) => {
    const { bloodType, location } = req.query;
    let query = {};
    
    if (bloodType) {
      query.bloodType = bloodType;
    }
    
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    
    const data = await Blood.find(query).populate('donor', 'name');
    res.json(data);
  });

  router.post("/add", async (req, res) => {
    const blood = new Blood(req.body);
    await blood.save();
    io.emit("bloodUpdated");
    res.json({ message: "Blood Added" });
  });

  return router;
};
