const productmodel = require("../models/productmodel");

module.exports.productManagement = async (req, res) => {
  let products = await productmodel.find();
  products = products.map((p) => ({
    ...p.toObject(),
    productImageBase64: p.productImage.toString("base64"),
  }));
  let alert = req.flash("tokenInfo");
  res.render("productManagement", { products, alert });
};
