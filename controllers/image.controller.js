const fs = require("fs");
const db = require("../helpers/db");
const Image = db.Image;

const upload = async (req, res, next) => {
  const image = new Image({
    path: req.file.path,
  });

  try {
    await image.save();
  } catch (err) {
    res.status(500).json({ message: "Image uploading failed" });
    return next(err);
  }

  res.status(201).json(image);
};

exports.upload = upload;
