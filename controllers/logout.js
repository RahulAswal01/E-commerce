module.exports.logout = (req, res) => {
  res.clearCookie("token");
  req.flash("tokenInfo", "logout sucessfull");
  res.redirect("/");
};
