import express from "express";
import path from "path";
import multer from "multer";

const app = express();
app.set("view engine", "ejs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + "_" + path.basename(file.originalname));
  },
});

const upload = multer({ storage: storage });

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
