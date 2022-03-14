const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "first name is required"],
    maxlength: 15,
  },
  lastname: {
    type: String,
    required: [true, "last name is required"],
    maxlength: 15,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  photo: { type: String, default: "avatar" },
  phone: { type: String },
  password: {
    type: String,
    required: [true, "password is required"],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Confirm password is required"],
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "admin", "lib-assistant"],
    default: "user",
  },
});

// hashing password from the user before saving into DB
userSchema.pre("save", async function (next) {
  // only run if password was modified
  if (!this.isModified("password")) return next();

  // password hashed with a salt of 12
  this.password = await bcrypt.hash(this.password, 12);
  // delete confirmpassword field
  this.confirmPassword = undefined;
  next();
});

// comparing hashed password during login
userSchema.methods.comparePasswords = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model("User", userSchema);
