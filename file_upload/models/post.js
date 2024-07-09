import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  key: String,
  url: String,
});

const Post = mongoose.model("post", postSchema);

export default Post;
