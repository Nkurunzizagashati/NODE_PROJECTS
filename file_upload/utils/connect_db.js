import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_URI = process.env.MONGODB_URI;

const createDbConnection = () => {
  mongoose
    .connect(DB_URI, {
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("CONNECTED TO DB");
    })
    .catch((err) => {
      console.error(`FAILED TO CONNECT TO THE DB: ${err}`);
    });
};

export default createDbConnection;
