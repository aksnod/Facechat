const passport = require("passport");
const User = require("../models/user");
const fs = require("fs");
const path = require("path");
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
module.exports.update = async function (req, res) {
  // if (req.params.id == req.user.id) {
  //   User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
  //     req.flash("success", "updated successfully");
  //     return res.redirect("back");
  //   });
  // } else {
  //   req.flash("error", err);
  //   res.status(401).send("unautherization");
  // }

  if (req.params.id == req.user.id) {
    try {
      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req, res, function (err) {
        if (err) console.log("************multer error", err);
        user.name = req.body.name;
        user.email = req.body.email;
        if (req.file) {
          if (user.avatar) {
            fs.unlinkSync(path.join(__dirname, "..", user.avatar));
          }
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();
        req.flash("success", "updated successfully");
        return res.redirect("back");
      });
    } catch (error) {
      req.flash("error", err);
      return res.redirect(back);
    }
  } else {
    req.flash("error", err);
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
