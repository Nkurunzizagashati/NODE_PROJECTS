import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_URI = process.env.MONGODB_URI;

const createDbConnection = () => {
  mongoose
    .connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("CONNECTED TO DB");
    })
    .catch((err) => {
      console.error(`Failed to connect to the db: ${err}`);
    });
};
