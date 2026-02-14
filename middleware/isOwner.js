const jwt = require("jsonwebtoken");
const ownermodel = require("../models/ownermodel");

module.exports.isOwner = async (req, res, next) => {
  if (!req.cookies.ownertoken) {
    res.status(401);
    req.flash("tokenInfo", "something went wrong login first");
    return res.redirect("/");
  }
  try {
    let decodedData = jwt.verify(
      req.cookies.ownertoken,
      process.env.OWNERSECRETKEY,
    );
    let { email } = decodedData;
    let ownerData = await ownermodel
      .findOne({ email: email })
      .select("-password");
    if (ownerData) {
      next();
    }
  } catch (err) {
    res.status(401);
    req.flash("tokenInfo", "something went wrong login first");
    return res.redirect("/");
  }
};
