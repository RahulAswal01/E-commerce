const jwt = require("jsonwebtoken");
const usermodel = require("../models/usermodel");

module.exports.isLoggedIn = async (req, res, next) => {
  if (!req.cookies.token) {
    res.status(401);
    req.flash("tokenError", "something went wrong login first");
    console.log("from first");
    return res.redirect("/");
  }
  try {
    let decodedData = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    let { id } = decodedData;
    let userData = await usermodel.findOne({ _id: id }).select("-password");
    req.user = userData;
    // console.log(userData);
    next();
  } catch (err) {
    res.status(401);
    console.log("from second");
    req.flash("tokenError", "something went wrong login first");
    return res.redirect("/");
  }
};
