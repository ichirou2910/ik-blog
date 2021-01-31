const jwt = require("jsonwebtoken");
const config = process.env.SECRET;

module.exports = (req, res, next) => {
  try {
    if (req.get("authorization")) {
      let token = req.get("authorization").split(" ")[1];
      if (!token) {
        throw new Error("Authentication failed!");
      }
      const decodedToken = jwt.verify(token, config);
      req.userData = { name: decodedToken.name };
    } else {
      req.userData = {};
    }

    next();
  } catch (err) {
    res.status(401).json({ message: "Authentication failed!" });
    return next(err);
  }
};
