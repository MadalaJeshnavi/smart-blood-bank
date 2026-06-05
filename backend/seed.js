const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const Blood = require("./models/blood");

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/smart-blood-bank");
    
    // Read blood data from JSON file
    const bloodDataPath = path.join(__dirname, "data", "bloods.json");
    const bloodData = JSON.parse(fs.readFileSync(bloodDataPath, "utf-8"));
    
    // Clear existing data
    await Blood.deleteMany({});
    
    // Insert sample data
    await Blood.insertMany(bloodData);
    
    console.log("Sample blood data seeded successfully from bloods.json!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
