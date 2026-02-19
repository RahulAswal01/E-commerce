const productmodel = require("../models/productmodel");
const usermodel = require("../models/usermodel");

module.exports.productsHome = async (req, res) => {
  let alert = req.flash("tokenInfo");
  let products = await productmodel.find();
  let userdata = req.user;
  // Convert buffer to base64 string
  products = products.map((p) => ({
    ...p.toObject(),
    productImageBase64: p.productImage.toString("base64"),
  }));

  res.render("product.ejs", { alert, products, userdata });
};
