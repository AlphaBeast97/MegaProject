import mongoose from "mongoose";
import ENV from "./env.js";
const MONGO_URI = ENV.MONGO_DB_URI;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
