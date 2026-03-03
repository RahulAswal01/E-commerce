const productmodel = require("../models/productmodel");

module.exports.deleteProduct = async (req, res) => {
  try {
    await productmodel.findOneAndDelete({
      _id: req.params.product_id,
    });
    req.flash("tokenInfo", "Product deleted successfully");
    res.redirect("/owner/productManagement");
  } catch (err) {
    res.redirect("/owner/productManagement");
  }
};
