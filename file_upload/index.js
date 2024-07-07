import express from "express";
import userRouter from "./routes/user";
import upload from "./utils/file_upload";

const app = express();
app.use("auth", userRouter);
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
