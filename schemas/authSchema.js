const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const authSchema = mongoose.Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
      minlenfth: [6, "password is at least 6 symbols"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarUrl: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
    token: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

authSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt();
  const cryptPassword = await bcrypt.hash(this.password, salt);

  this.password = cryptPassword;
});

authSchema.pre("save", async function () {
  const urlAvatar = gravatar.url(
    this.email,
    { s: "200", r: "pg", d: "wavatar" },
    false
  );

  this.avatarUrl = urlAvatar;
});

module.exports = authSchema;
