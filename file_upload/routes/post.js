import express from "express";
import { upload } from "../utils/file_upload.js";
import { createPost, getPost } from "../controllers/post.js";

const router = express.Router();

router.get("/api", (req, res) => {
  res.send(`
    <div>
      <h1>Upload an image</h1>
      <form method="post" action="/api/posts" enctype="multipart/form-data">
        <input type="file" name="video" accept="video/*" />
        <input type="text" name="title" />
        <input type="submit" />
      </form>
    </div>
  `);
});

router.get("/api/posts", getPost);

router.post("/api/posts", upload.single("video"), createPost);

export default router;
