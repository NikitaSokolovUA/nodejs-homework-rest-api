const express = require("express");
const {
  signUp,
  signIn,
  logOut,
  current,
  changeSubscription,
  updateAvatar,
} = require("../../controller/auth");
const { authByToken, uploadAvatar } = require("../../middleware");

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/logout", authByToken, logOut);
router.get("/current", authByToken, current);
router.patch("/users", authByToken, changeSubscription);
router.patch(
  "/users/avatar",
  authByToken,
  uploadAvatar.single("avatar"),
  updateAvatar
);

module.exports = router;
