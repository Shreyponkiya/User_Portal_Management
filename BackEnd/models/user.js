const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String || Number,
    required: true,
  },
  password1: {
    type: String || Number,
    required: false,
  },
  password2: {
    type: String || Number,
    required: false,
  },
  password3: {
    type: String || Number,
    required: false,
  },
});
const User = new mongoose.model("User", Schema);

module.exports = User;
