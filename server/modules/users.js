const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim:true,
  },
  useremail: {
    type: String,
  },
  userpass: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const users = mongoose.model("users", userSchema);
module.exports = users;
