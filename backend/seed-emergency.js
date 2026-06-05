const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const Emergency = require("./models/emergency");

dotenv.config();

const seedEmergencyDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/smart-blood-bank");
    
    // Read emergency data from JSON file
    const emergencyDataPath = path.join(__dirname, "data", "emergencies.json");
    const emergencyData = JSON.parse(fs.readFileSync(emergencyDataPath, "utf-8"));
    
    // Clear existing data
    await Emergency.deleteMany({});
    
    // Insert sample data
    await Emergency.insertMany(emergencyData);
    
    console.log("Sample emergency data seeded successfully from emergencies.json!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedEmergencyDatabase();
