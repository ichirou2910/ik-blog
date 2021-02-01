const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  draft: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  slug: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: false,
  },
  cover: {
    type: String,
    required: false,
  },
  tags: { type: Array, required: false },
  views: { type: Number, required: true },
  date: { type: Date, required: true },
  createdDate: { type: String, required: true },
  modifiedDate: { type: String, required: true },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
