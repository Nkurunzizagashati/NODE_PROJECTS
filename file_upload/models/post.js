import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  url: String,
});

const Post = mongoose.model("post", postSchema);

export default Post;
