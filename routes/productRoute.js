const express = require("express");
const Router = express.Router();
const { isLogin } = require("../middleware/isLogin");

Router.get("/", (req, res) => {
  res.send("hello from product router");
});

Router.get("/home", isLogin, (req, res) => {
  let alert = req.flash("tokenInfo");
  res.render("product.ejs", { alert });
});

Router.get("/logout", (req, res) => {
  res.clearCookie("token");
  req.flash("tokenInfo", "logout sucessfull");
  res.redirect("/");
});

module.exports = Router;
