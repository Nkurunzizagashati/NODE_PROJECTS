import express from "express";
import userRouter from "./routes/user.js";
import upload from "./utils/file_upload.js";
import dotenv from "dotenv";
import createDbConnection from "./utils/connect_db.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import googleAuthRouter from "./routes/auth2.js";
import passport from "passport";

const app = express();
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
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
app.use(passport.initialize());
app.use(passport.session());

dotenv.config();

// CONNECTING TO DB

createDbConnection();

app.use("/user", userRouter);
app.use("/auth", googleAuthRouter);
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { title: "Home Page", message: "Hello, EJS!" });
});

app.post("/upload", upload.single("image"), (req, res) => {
  console.log("Hello from the server");
  res.send("Uploaded");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`SERVER IS STARTED AND IS RUNNING ON PORT: ${PORT}`);
});
