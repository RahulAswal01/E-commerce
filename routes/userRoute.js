const express = require("express");
const usermodel = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Router = express.Router();

Router.post("/createuser", async (req, res) => {
  let { fullName, email, password, contactNo } = req.body;
  let checkUser = await usermodel.findOne({ email: email });
  if (checkUser) {
    // await usermodel.deleteMany({});
    return res.send("User already exits");
  }
  bcrypt.genSalt(12, (err, salt) => {
    if (err) {
      throw err;
    }
    bcrypt.hash(password, salt, async (err, hash) => {
      let createdUser = await usermodel.create({
        fullName,
        email,
        password: hash,
        contact: contactNo,
      });
      // let token = jwt.sign({ id: createdUser._id }, "secretkey");
      // res.cookie("token", token);
      return res.redirect("/");
    });
  });
});
Router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let checkUser = await usermodel.findOne({ email: email });
  if (!checkUser) {
    return res.send("invalid credentials");
  }
  bcrypt.compare(password, checkUser.password, (err, result) => {
    if (err) {
      throw err;
    }
    if (result) {
      let token = jwt.sign({ id: checkUser._id }, "secretkey");
      res.cookie("token", token);
      return res.send("product page");
    } else {
      res.send("invalid credentials");
    }
  });
});

module.exports = Router;
