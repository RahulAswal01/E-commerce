module.exports.ownerLogout = (req, res) => {
  try {
    req.flash("tokenInfo", "Owner logout sucessfull");
    res.redirect("/");
  } catch (err) {
    req.flash("tokenInfo", "error in Owner logout");
    res.redirect(eq.get("referer"));
  }
};
