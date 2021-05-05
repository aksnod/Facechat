const passport = require("passport");
const User = require("../models/user");
//render the user profile page
module.exports.profile = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    res.render("user_profile", {
      title: "Profile",
      user_profile: user,
    });
  });
};

//update the user data
module.exports.update = function (req, res) {
  if (req.params.id == req.user.id) {
    User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
      req.flash('success','updated successfully');
      return res.redirect("back");
    });
  } else {
    res.status(401).send("unautherization");
  }
};

//render the sign in page
module.exports.signIn = function (req, res) {
  res.render("user_sign_in", {
    title: "User | sign in",
  });
};
//render the sign up page
module.exports.signUp = function (req, res) {
  res.render("user_sign_up", {
    title: "User | sign up",
  });
};

//get user signup data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    req.flash("error", "password is not match");
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      req.flash("error", err);

      return res.redirect("back");
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          req.flash("error", err);

          return res.redirect("back");
        }
        req.flash("success", "Sign up successfully");
        return res.redirect("/users/sign-in");
      });
    } else {
      req.flash("error", "User is already exist");
      return res.redirect("back");
    }
  });
};

//sign in and create a session
module.exports.createSession = function (req, res) {
  req.flash("success", "Logged in successfully.");
  return res.redirect("/");
};

//destroy session
module.exports.destroySession = function (req, res) {
  req.flash("success", "logged out successfully.");
  req.logout();
  return res.redirect("/");
};
