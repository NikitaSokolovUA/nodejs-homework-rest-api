const nodemailer = require("nodemailer");

// const { EMAIL_USER, EMAIL_PASS } = process.env;

const sendEmail = async ({ to, subject, html }) => {
  const email = {
    from: "n-sokolov@ukr.net",
    to,
    subject,
    html,
  };

  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "4683c5f76a373f",
      pass: "5c762ca8d17227",
    },
  });

  await transport.sendMail(email);
};

module.exports = { sendEmail };
