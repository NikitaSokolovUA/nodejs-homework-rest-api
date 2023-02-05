const Auth = require("../../models/auth");
const signUpSchema = require("../../schemas/Joi/signUpSchema");
const { BadRequest, Conflict } = require("http-errors");
const { sendEmail } = require("../../helpers/sendEmail");
const { nanoid } = require("nanoid");

const signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = signUpSchema.validate(req.body);
    const verificationToken = nanoid();

    if (error) {
      throw next(BadRequest(error.message));
    }

    const newUser = await Auth.create({
      email,
      password,
      verificationToken,
    });

    await sendEmail({
      to: email,
      subject: "Please confirmyour email",
      html: `<a href='localhost:3000/api/auth/verify/${verificationToken}'>Confirm your email</a>`,
    });

    res.status(201).json({
      user: { email: newUser.email, subscription: newUser.subscription },
    });
  } catch (error) {
    if (
      error &&
      error.message.includes("E11000 duplicate key error collection")
    ) {
      next(Conflict("Email is use"));
      return;
    }

    next(error);
  }
};

module.exports = signUp;
