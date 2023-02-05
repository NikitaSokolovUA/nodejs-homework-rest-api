const Auth = require("../../models/auth");
const { sendEmail } = require("../../helpers/sendEmail");
const resendEmail = require("../../schemas/Joi/resendEmail");

const resendingEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const { error } = resendEmail.validate(email);

    if (error) {
      return res.status(400).json({ message: "missing required field email" });
    }

    const user = await Auth.findOne({ email });

    if (user.verify) {
      res.status(400).json({ message: "Verification has already been passed" });
    }

    await sendEmail({
      to: email,
      subject: "Please confirmyour email",
      html: `<a href='localhost:3000/api/auth/verify/${user.verificationToken}'>Confirm your email</a>`,
    });

    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
};

module.exports = resendingEmail;
