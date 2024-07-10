import express from "express";
import { upload } from "../utils/file_upload.js";
import { createPost, getPost } from "../controllers/post.js";

const router = express.Router();

/**
 * GET /api
 * Renders a web page with a form for uploading a video and a title
 * @param {Object} req - The Express request object
 * @param {Object} res - The Express response object
 * @returns {void}
 */
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

/**
 * GET /api/posts
 * Retrieves a list of all posts
 * @param {Object} req - The Express request object
 * @param {Object} res - The Express response object
 * @returns {void}
 */
router.get("/api/posts", getPost);

/**
 * POST /api/posts
 * Uploads a video and creates a new post
 * @param {Object} req - The Express request object
 * @param {Object} res - The Express response object
 * @returns {void}
 */
router.post("/api/posts", upload.single("video"), createPost);

export default router;
