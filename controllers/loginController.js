const usermodel = require("../models/usermodel");
const { generateToken } = require("../utilis/generateToken");
const bcrypt = require("bcrypt");

module.exports.loginUser = async (req, res) => {
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
      let token = generateToken(checkUser);
      if (token) {
        res.cookie("token", token);
      } else {
        return res.send("err is send token");
      }
      return res.redirect("/product/home");
    } else {
      res.send("invalid credentials");
    }
  });
};
