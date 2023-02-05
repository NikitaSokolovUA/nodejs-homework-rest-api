const Auth = require("../../models/auth");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const updateAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { filename } = req.file;
    const tmpPath = path.resolve(__dirname, "../../tmp", filename);
    const publicPath = path.resolve(
      __dirname,
      "../../public/avatars",
      filename
    );

    try {
      const image = await Jimp.read(tmpPath);
      await image.resize(250, 250);
      await image.write(publicPath);
      await fs.unlink(tmpPath);
    } catch (error) {
      await fs.unlink(tmpPath);
      throw error;
    }

    const filePath = `/public/${filename}`;

    const updatedUser = await Auth.findByIdAndUpdate(
      { _id: _id },
      { avatarUrl: filePath },
      { new: true }
    );

    res.status(200).json({ avatarUrl: updatedUser.avatarUrl });
  } catch (error) {
    next(error);
  }
};

module.exports = updateAvatar;
