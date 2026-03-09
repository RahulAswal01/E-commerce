module.exports.cartView = async (req, res) => {
  let user = await req.user.populate("cart");
  let alert = req.flash("tokenInfo");
  let grandTotal = 0;
  user.cart.forEach((val) => {
    grandTotal += val.productPrice - val.discount;
  });
  const payment_key = process.env.RAZORPAY_KEY_ID;
  res.render("cart", { user, alert, grandTotal, payment_key });
};
