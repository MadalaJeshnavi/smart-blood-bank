const Blood = require("../models/blood");

module.exports = (io) => {
  const express = require("express");
  const router = express.Router();

  router.get("/", async (req, res) => {
    const { group } = req.query;
    const data = group
      ? await Blood.find({ bloodGroup: group })
      : await Blood.find();
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
