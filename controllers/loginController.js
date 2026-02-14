const usermodel = require("../models/usermodel");
const { generateToken } = require("../utilis/generateToken");
const bcrypt = require("bcrypt");

module.exports.loginUser = async (req, res) => {
  let { email, password } = req.body;
  if (email == process.env.OWNERMAIL && password == process.env.OWNERPASSWORD) {
    return res.render("ownerlogin");
  }
  let checkUser = await usermodel.findOne({ email: email });
  if (!checkUser) {
    req.flash("tokenInfo", "invalid credentials");
    return res.redirect("/");
  }
  bcrypt.compare(password, checkUser.password, (err, result) => {
    if (err) {
      throw err;
    }
    if (result) {
      let token = generateToken(checkUser);
      if (token) {
        res.cookie("token", token);
      } else {
        return res.send("err is send token");
      }
      req.flash("tokenInfo", "login sucessfull");
      return res.redirect("/product/home");
    } else {
      req.flash("tokenInfo", "invalid credentials");
      return res.redirect("/");
    }
  });
};
