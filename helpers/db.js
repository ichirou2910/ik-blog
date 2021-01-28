const mongoose = require("mongoose");

const db = process.env.MONGO_URI;

mongoose
  .connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

mongoose.Promise = global.Promise;

module.exports = {
  User: require("../models/User"),
  Post: require("../models/Post"),
  Comment: require("../models/Comment"),
  Image: require("../models/Image"),
};
