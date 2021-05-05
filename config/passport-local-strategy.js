const Passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

//Authentication using passport
Passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          //console.log("Error to finding user---Passport");
          req.flash("error", "Error to finding user");
          return done(err);
        }
        if (!user || user.password != password) {
          //console.log("Invalid password or USERNAME");
          req.flash("error", "Invalid Username or password");
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);

//serializing the user to decide which key is to be kept in cookies.
Passport.serializeUser(function (user, done) {
  return done(null, user.id);
});

//deserializing the user from the key in the cookies.
Passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error to finding user");
      return done(err);
    }
    return done(null, user);
  });
});

//check user is authenticated
Passport.checkAuthentication = function (req, res, next) {
  //check user signed in, then pass to request to next function(controller function)
  if (req.isAuthenticated()) return next();

  //is not authenticate than redirect to sign page
  return res.redirect("/users/sign-in");
};

Passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    //req.user contains the current signed user from the cookie and we are just sending this locals for views
    res.locals.user = req.user;
  }
  next();
};
Passport.notCheckAuthentication = function (req, res, next) {
  //check user signed in, then pass to request to next function(controller function)
  if (req.isAuthenticated()) return res.redirect("/users/profile");

  next();
};
module.exports = Passport;
