const jwt = require("jsonwebtoken");
const usermodel = require("../models/usermodel");

module.exports.isLogin = async (req, res, next) => {
  if (!req.cookies.token) {
    res.status(401);
    req.flash("tokenInfo", "something went wrong login first");
    return res.redirect("/");
  }
  try {
    let decodedData = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    let { id } = decodedData;
    let userData = await usermodel.findOne({ _id: id }).select("-password");
    req.user = userData;
    // req.flash("tokenInfo", "Sucessfully login");
    // console.log(userData);
    next();
  } catch (err) {
    res.status(401);
    req.flash("tokenInfo", "something went wrong login first");
    return res.redirect("/");
  }
};
