const express = require("express");
const Router = express.Router();
const { isLogin } = require("../middleware/isLogin");

Router.get("/", (req, res) => {
  res.send("hello from product router");
});

Router.get("/home", isLogin, (req, res) => {
  res.render("product.ejs");
});

Router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

module.exports = Router;
