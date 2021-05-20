const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");

const User = require("../models/user");

passport.use(
  new googleStrategy(
    {
      clientID:
        "394281436170-9uqcns5h5agqcbo1qntaj2tejf1k3jk4.apps.googleusercontent.com",
      clientSecret: "S40AYbSVmX3EL17bBftrTL5i",
      callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      //find the user
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
        
      ) {
        if (err) {
          console.log("error is google-passport strategy", err);
          return;
        }
        console.log(accessToken, refreshToken);
        console.log(profile);
        if (user) {
          //if user found that set user as req.user
          return done(null, user);
        } else {
          // if not found, create a user and set it req.user
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(28).toString("hex"),
            },
            function (err, user) {
              if (err) {
                console.log(
                  "error to create user by google oauth strategy ",
                  err
                );
                return done(null, false);
              }
              return done(null, user);
            }
          );
        }
      });
    }
  )
);
module.exports = passport;
