const fs = require("fs");
const db = require("../helpers/db");
const Post = db.Post;
const Image = db.Image;

const imageCleanup = async () => {
  // Get a collection of used images and all images
  let posts = [];
  let images = [];
  try {
    posts = await Post.find();
    images = await Image.find();
  } catch (err) {
    return next(err);
  }

  let usedImages = [];
  let allImages = [];
  usedImages = posts.reduce((usedImages, item) => {
    return [...usedImages, ...item.imagesUsed];
  }, usedImages);

  allImages = images.reduce((allImages, item) => {
    return [...allImages, item.path];
  }, allImages);

  // Delete unused images
  allImages.forEach(async (item) => {
    if (!usedImages.includes(item)) {
      let image;
      try {
        image = await Image.findOne({ path: item });
      } catch (err) {
        return;
      }

      if (!image) {
        return;
      }

      fs.unlink(image.path, (err) => console.log(err));
      await Image.deleteOne(image);
    }
  });
};

module.exports = imageCleanup;
