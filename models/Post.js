const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: false,
  },
  tags: {
    type: Array,
    required: false,
  },
  date: { type: Date, required: true },
  displayDate: { type: String, required: true },
});

const Post = mongoose.model("Blog", PostSchema);

module.exports = Post;
