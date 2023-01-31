const multer = require("multer");
const path = require("path");
const { nanoid } = require("nanoid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../tmp"));
  },
  filename: function (req, file, cb) {
    cb(null, nanoid() + file.originalname);
  },
});

const uploadAvatar = multer({
  storage,
});

module.exports = { uploadAvatar };
