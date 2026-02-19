const usermodel = require("../models/usermodel");

module.exports.addToCart = async (req, res) => {
  try {
    let inCart = await usermodel.findOne({ cart: req.params.productId });
    if (!inCart) {
      req.user.cart.push(req.params.productId);
      await req.user.save();
      req.flash("tokenInfo", "Product added to cart successfully");
      res.redirect("/product/home");
    } else {
      req.flash("tokenInfo", "Product already exits in your basket");
      res.redirect("/product/home");
    }
  } catch {
    req.flash("tokenInfo", "something went wrong try again later");
    res.redirect("/product/home");
  }
};
