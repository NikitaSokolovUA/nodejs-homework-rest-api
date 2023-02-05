const signUp = require("./signUp");
const signIn = require("./signIn");
const logOut = require("./logOut");
const current = require("./current");
const changeSubscription = require("./changeSubscription");
const updateAvatar = require("./updateAvatar");
const verifyEmail = require("./verifyEmail");
const resendingEmail = require("./resendingEmail");

module.exports = {
  signUp,
  signIn,
  logOut,
  current,
  changeSubscription,
  updateAvatar,
  verifyEmail,
  resendingEmail,
};
