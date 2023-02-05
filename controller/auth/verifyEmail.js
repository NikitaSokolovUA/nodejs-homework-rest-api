const Auth = require("../../models/auth");

const verifyEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;

    const user = await Auth.findOne({ verificationToken });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await Auth.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: "",
    });

    res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyEmail;
