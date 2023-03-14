const bcrypt = require("bcryptjs");
const User = require("../models/User");
const badReq = require("../error/badReq");
const unAuth = require("../error/unAuth");

const signup = async (req, res) => {
  const { username, email, password, gender } = req.body;
  if (!username || !email || !password || !gender) {
    throw new badReq("Fill the form completely");
  }
  const foundEmail = await User.findOne({ email });
  if (foundEmail) {
    throw new badReq("Email already exist");
  }
  const foundName = await User.findOne({ username });
  if (foundName) {
    throw new badReq("Username already exist");
  }
};
