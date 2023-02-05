const Jimp = require("jimp");

const jimpAvatar = (path) => {
  console.log("JIMP");

  Jimp.read(path)
    .then((image) => {
      return image.resize(250, 250);
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = { jimpAvatar };
