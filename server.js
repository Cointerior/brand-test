require("dotenv").config();
const express = require("express");
const connectDB = require("./dbconn");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const PORT = process.env.PORT || 3500;

require("./config/passport")(passport);

connectDB();

app.use(
  session({
    secret: "slim shady",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", require("./router/auth"));

mongoose.connection.once("open", () => {
  console.log("Connected to Database");
  app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
});

// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });
