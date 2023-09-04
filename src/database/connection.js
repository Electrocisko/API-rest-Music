import mongoose from "mongoose";
import config from "../config/config.js";

const MONGO_USER = config.database.MONGO_USER;
const MONGO_PASSWORD = config.database.MONGO_PASSWORD;

const MONGO_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.rvl2uyz.mongodb.net/?retryWrites=true&w=majority`;

const connection = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Database Conected");
  } catch (error) {
    console.log(error);
    throw new Error("Does not have connect to database");
  }
};

export default connection;