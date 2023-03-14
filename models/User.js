const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {},
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
