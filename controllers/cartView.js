module.exports.cartView = async (req, res) => {
  let user = await req.user.populate("cart");
  let alert = req.flash("tokenInfo");
  let grandTotal = 0;
  user.cart.forEach((val) => {
    grandTotal += val.productPrice - val.discount;
  });
  res.render("cart", { user, alert, grandTotal });
};
