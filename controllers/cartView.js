module.exports.cartView = async (req, res) => {
  let user = await req.user.populate("cart");
  const grandTotal = 0;
  let alert = req.flash("tokenInfo");
  res.render("cart", { user, grandTotal, alert });
};
