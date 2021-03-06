const fs = require("fs");
const path = require("path");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cron = require("node-cron");
require("dotenv").config();
const imageCleanup = require("./middleware/image-cleanup");

const app = express();

// Middleware
app.use(cors());

// Bodyparser
app.use(bodyParser.json());

// Monthly cron job to cleanup unused images
cron.schedule("0 0 1 * *", imageCleanup);

app.use("/uploads/images", express.static(path.join("uploads", "images")));
app.use(express.static(path.join(__dirname, "client", "build")));

// Routes
app.use("/api/post", require("./routes/post.route"));
app.use("/api/user", require("./routes/user.route"));
app.use("/api/image", require("./routes/image.route"));

app.use((_req, res, _next) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.use((error, req, res, _next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An error occured!" });
});

app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  next();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server starts on port ${PORT}`));
