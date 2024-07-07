import express from "express";
import userRouter from "./routes/user.js";
import upload from "./utils/file_upload.js";
import dotenv from "dotenv";
import createDbConnection from "./utils/connect_db.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import { cookie } from "express-validator";

const app = express();
app.use(express.json());
app.use(
  session({
    secret: "My secret",
    saveUninitialized: false,
    resave: false,

    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
    cookie: {
      maxAge: 60000 * 60 * 48,
    },
  })
);

dotenv.config();

// CONNECTING TO DB

createDbConnection();

app.use("/user", userRouter);
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { title: "Home Page", message: "Hello, EJS!" });
});

app.post("/upload", upload.single("image"), (req, res) => {
  console.log("Hello from the server");
  res.send("Uploaded");
});

app.listen(3000, () => {
  console.log("SERVER IS STARTED AND IS RUNNING ON PORT: 3000");
});
