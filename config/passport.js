const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        const newUser = {
          firstName: profile.name.givenName,
          lastName: profile.name.family,
          authenticationType: {
            google: {
              uuid: profile.id,
            },
          },
          //   image: profile.photos[0].value,
        };

        try {
          let user = await User.findOne({ googleId: profile.id }); //Google doesn't return user's gender and email itself
          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (e) {
          console.log(e);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
