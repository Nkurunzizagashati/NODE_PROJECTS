import express from "express";
import path from "path";

const app = express();
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { title: "Home Page", message: "Hello, EJS!" });
});

app.post("/upload", (req, res) => {
  res.send("Uploaded");
});

app.listen(3000, () => {
  console.log("SERVER IS STARTED AND IS RUNNING ON PORT: 3000");
});
