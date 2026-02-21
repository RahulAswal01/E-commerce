const usermodel = require("../models/usermodel");

module.exports.removecart = async (req, res) => {
  await usermodel.findOneAndUpdate(
    { _id: req.user._id },
    { $pull: { cart: req.params.product_id } },
  );
  req.flash("tokenInfo", "Product removed sucessfully");
  res.redirect(req.get("referer"));
};
