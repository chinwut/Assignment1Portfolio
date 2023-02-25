const express = require('express');
const router = express.Router();

const passport = require('passport');

const UserModel = require("../models/user");
const User = UserModel;

module.exports.displayPage = (title, view) => (req, res, next) => {
    res.render(`${view}`, {
      title,
      displayName: req.user ? req.user.displayName : "",
    });
  };

module.exports.displayLoginPage = (req, res, next) => {
  // check if the user is already logged in
  if (req.user) {
    return res.redirect("/");
  }
  res.render("auth/login", {
    title: "Login",
    displayName: req.user ? req.user.displayName : "",
  });
};

module.exports.processLoginPage = (req, res, next) => {
  passport.authenticate("local", (err, User, info) => {
    // server err?
    if (err) {
      return next(err);
    }
    // is there a user login error?
    if (!User) {
      console.log("Error ",info.message);
      return res.redirect("/login");
    }
    req.login(User, (err) => {
      // server error?
      if (err) {
        console.log("Error err",err.message);
        return next(err);
      }
      return res.redirect("/business-list");
    });
  })(req, res, next);
};

module.exports.displayRegisterPage = (req, res, next) => {
  // check if the user is not already logged in
  if (req.user) {
    return res.redirect("/");
  }
  res.render("auth/register", {
    title: "Register",
    displayName: req.user ? req.user.displayName : "",
  });
};

module.exports.processRegisterPage = (req, res, next) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    displayName: req.body.displayName,
  });
  User.register(newUser, req.body.password, (err) => {
    if (err) {
      if (err.name === "UserExistsError") {
      }
      return res.render("auth/register", {
        title: "Register",
        displayName: req.user ? req.user.displayName : "",
      });
    } else {
      // if no error exists, then registration is successful
      // redirect the user and authenticate them
      return passport.authenticate("local")(req, res, () => {
        res.redirect("/business-list");
      });
    }
  });
};

module.exports.performLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};