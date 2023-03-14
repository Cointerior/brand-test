const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    type: String,
    required: true,
    unique: true,
  },
  authenticationType: {
    form: {
      password: String,
    },
    google: {
      uuid: String,
    },
  },
});

module.exports = mongoose.model("User", userSchema);
