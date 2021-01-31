const fs = require("fs");
const db = require("../helpers/db");
const Post = db.Post;

const getAll = async (req, res, next) => {
  let posts;
  let filter = {};

  const query = req.query.q;

  if (!req.userData.name) {
    filter["draft"] = false;
  }

  if (query)
    if (query.startsWith("#", 0))
      filter["tags"] = query.split(" ")[0].substr(1);
    else filter["title"] = { $regex: query, $options: "i" };

  try {
    posts = await Post.find(filter).sort({ date: -1 });
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
    return next(err);
  }

  res.json(posts);
};

const getBySlug = async (req, res, next) => {
  let filter = { slug: req.params.slug };
  if (!req.userData.name) filter["draft"] = false;

  let post;
  try {
    post = await Post.findOne(filter);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
    return next(err);
  }
  if (!post) {
    res.status(404).json({ message: "Post not found" });
    return;
  }

  res.json(post);
};

const getByTag = async (req, res, next) => {
  let filter = { tags: req.params.tag };
  if (!req.userData.name) filter["draft"] = false;

  let post;
  try {
    post = await Post.find(filter);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
    return next(err);
  }
  if (!post) {
    res.status(404).json({ message: "Post not found" });
    return;
  }

  res.json(post);
};

const create = async (req, res, next) => {
  if (req.body.user !== req.userData.name) {
    res.status(401).json({ message: "Authorization failed" });
    return;
  }

  const tags = req.body.tags.split(" ");

  const post = new Post({
    draft: req.body.draft,
    user: req.body.user,
    userId: req.body.userId,
    title: req.body.title,
    slug: req.body.slug,
    tags: tags,
    content: req.body.content,
    date: Date.parse(req.body.date),
    displayDate: req.body.displayDate,
  });

  if (req.file) {
    post.cover = req.file.path;
  } else {
    post.cover = "uploads/images/post-no-image.png";
  }

  console.log(post);

  try {
    await post.save();
  } catch (err) {
    res.status(500).json({ message: "Post creating failed" });
    return next(err);
  }

  res.status(201).json(post);
};

const update = async (req, res, next) => {
  let post;
  try {
    post = await Post.findOne({ slug: req.params.slug });
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
    return next(err);
  }

  if (post.user !== req.userData.name) {
    res
      .status(401)
      .json({ message: "You are not allowed to modify this post" });
    return;
  }

  if (!post) {
    res.status(404).json({ message: "Post not found" });
    return;
  }

  if (req.body.draft !== undefined) {
    post.draft = req.body.draft;
  }
  if (req.body.title) {
    post.title = req.body.title;
  }
  if (req.body.content) {
    post.content = req.body.content;
  }
  if (req.body.tags) {
    post.tags = req.body.tags.split(" ");
  }

  post.date = req.body.date;
  post.displayDate = req.body.displayDate;

  // Delete old images and replace with new ones (if needed)
  if (req.file) {
    if (post.cover !== "uploads/images/default-avatar.png")
      fs.unlink(post.cover, (err) => console.log(err));
    post.cover = req.file ? req.file.path : "";
  }

  try {
    await post.save();
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
    return next(err);
  }
  res.status(200).json(post);
};

const _delete = async (req, res, next) => {
  let post;
  try {
    post = await Post.findOne({ slug: req.params.slug });
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
    return next(err);
  }

  if (post.user !== req.userData.name) {
    res
      .status(401)
      .json({ message: "You are not allowed to delete this post" });
    return;
  }

  if (!post) {
    res.status(404).json({ message: "Post not found" });
    return;
  }

  await Post.deleteOne(post);
  res.status(201).json({});
};

exports.getAll = getAll;
exports.getBySlug = getBySlug;
exports.getByTag = getByTag;
exports.create = create;
exports.update = update;
exports.delete = _delete;
