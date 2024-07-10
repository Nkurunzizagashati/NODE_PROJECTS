import { upload } from "../utils/file_upload.js";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
import path from "path";
import dotenv from "dotenv";
import Post from "../models/post.js";

dotenv.config();

const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const awsRegion = process.env.AWS_REGION;
const s3BucketName = process.env.S3_BUCKET_NAME;

const s3 = new S3Client({
  credentials: {
    accessKeyId: awsAccessKeyId,
    secretAccessKey: awsSecretAccessKey,
  },
  region: awsRegion,
});

/**
 * Creates a new post by uploading a file to S3 and saving the post details in the database.
 *
 * @async
 * @function createPost
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.title - The title of the post.
 * @param {Object} req.file - The uploaded file object.
 * @param {Buffer} req.file.buffer - The file buffer.
 * @param {string} req.file.originalname - The original name of the uploaded file.
 * @param {string} req.file.mimetype - The MIME type of the uploaded file.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} Sends the created post object in the response.
 */
const createPost = async (req, res) => {
  console.log("req.body:", req.body);
  console.log("req.file", req.file);

  const randomFileName = (bytes = 10) =>
    crypto.randomBytes(bytes).toString("hex");

  const fileName = randomFileName() + path.extname(req.file.originalname);
  const params = {
    Bucket: s3BucketName,
    Key: fileName,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  const command = new PutObjectCommand(params);

  try {
    const data = await s3.send(command);
    const post = await Post.create({ title: req.body.title, url: fileName });
    console.log("Upload successful:", data);
    res.send(post);
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).send("Error uploading image");
  }
};

/**
 * Retrieves a post by its title and generates a signed URL for accessing the file in S3.
 *
 * @async
 * @function getPost
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} Sends the signed URL in the response.
 */
const getPost = async (req, res) => {
  const file = await Post.findOne({ title: "Clock" });
  console.log(file);

  const getObjectParams = {
    Bucket: s3BucketName,
    Key: file.url,
  };

  const command = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3, command, {
    expiresIn: 3600,
  });

  res.send(url);
};

export { createPost, getPost };
