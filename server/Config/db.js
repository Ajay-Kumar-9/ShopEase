import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

export const connectDB = async () => {
  try {
    await mongoose
      .connect(MONGO_URI)
      .then(() => console.log("DB Connected Successfully"));
  } catch (error) {
    console.error("Error while connecting DB");
  }
};
