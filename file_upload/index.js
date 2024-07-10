import express from "express";
import userRouter from "./routes/user.js";
import { upload } from "./utils/file_upload.js";
import dotenv from "dotenv";
import createDbConnection from "./utils/connect_db.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import googleAuthRouter from "./routes/auth2.js";
import passport from "passport";
import postRouter from "./routes/post.js";

// Initialize express app
const app = express();
app.use(express.json());

// Configure session with MongoDB store
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
    cookie: {
      maxAge: 60000 * 60 * 48, // 48 hours
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Load environment variables
dotenv.config();

// Connect to the database
createDbConnection();

// Set up routes
app.use("/user", userRouter);
app.use("/auth", googleAuthRouter);
app.use("", postRouter);
app.set("view engine", "ejs");

/**
 * @route GET /
 * @description Renders the home page
 * @access Public
 */
app.get("/", (req, res) => {
  res.render("index", { title: "Home Page", message: "Hello, EJS!" });
});

/**
 * @route POST /upload
 * @description Handles file uploads
 * @access Public
 */
app.post("/upload", upload.single("image"), (req, res) => {
  console.log("Hello from the server");
  res.send("Uploaded");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`SERVER IS STARTED AND IS RUNNING ON PORT: ${PORT}`);
});
