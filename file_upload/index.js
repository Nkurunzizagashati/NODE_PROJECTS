import express from "express";

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index", { title: "Home Page", message: "Hello, EJS!" });
});

app.listen(3000, () => {
  console.log("SERVER IS STARTED AND IS RUNNING ON PORT: 3000");
});
