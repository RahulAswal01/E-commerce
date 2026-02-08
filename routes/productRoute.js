const express = require("express");
const Router = express.Router();
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(flash());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "secretkey",
  }),
);

Router.get("/", (req, res) => {
  res.send("hello from product router");
});

Router.get("/home", (req, res) => {
  res.render("product.ejs");
});

Router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

module.exports = Router;
