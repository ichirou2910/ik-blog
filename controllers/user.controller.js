const config = process.env.SECRET;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../helpers/db");
const User = db.User;

const login = async (req, res, next) => {
  let user;
  try {
    user = await User.findOne({ name: req.body.name });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
    return next(err);
  }

  if (!user) {
    res.status(404).json({ message: "User not found. Please register." });
    return;
  }

  if (bcrypt.compareSync(req.body.password, user.password)) {
    const token = jwt.sign({ name: user.name }, config, { expiresIn: "7d" });
    res.status(201).json({
      user: {
        userId: user.id,
        name: user.name,
        avatar: user.avatar,
      },
      token: token,
    });
  } else {
    res.status(400).json({ message: "Username or password is incorrect" });
  }
};

exports.login = login;
