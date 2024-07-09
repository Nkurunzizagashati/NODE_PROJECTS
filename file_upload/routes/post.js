import express from "express";
import Post from "../models/post.js";
import upload from "../utils/file_upload.js";

const router = express.Router();

router.get("/upload", (req, res) => {
  res.render("index.js");
});

// Upload endpoint
router.post("/upload", upload.single("image"), async (req, res) => {
  const imageUrl = req.file.location;
  const imageKey = req.file.key;

  const post = new Post({ key: imageKey, url: imageUrl });
  await post.save();

  res.send({
    message: "Image uploaded successfully!",
    imageUrl: imageUrl,
  });
});

// Retrieve list of images
router.get("/images", async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
});

// Serve uploaded images
router.get("/images/:key", (req, res) => {
  const params = {
    Bucket: bucketName,
    Key: req.params.key,
  };

  s3.getObject(params, (err, data) => {
    if (err) {
      return res.status(404).send(err);
    }

    res.writeHead(200, { "Content-Type": data.ContentType });
    res.write(data.Body, "binary");
    res.end(null, "binary");
  });
});

export default router;
