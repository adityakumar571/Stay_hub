const mongoose = require("mongoose");
const initData = require("./data.js");
const env = require('dotenv');

const Listing = require("../models/listing.js");

env.config();

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB");
    await initDB();
  } catch (err) {
    console.error("Connection error:", err);
  }
}

const initDB = async () => {
  try {
    await Listing.deleteMany({});
    const listings = initData.data[0].listings.map((obj) => ({
      ...obj,
      owner: "6654c1e90b1c0e239a397721",
    }));
    await Listing.insertMany(listings);
    console.log("Data was initialized");
  } catch (err) {
    console.error("Initialization error:", err);
  }
};

main();