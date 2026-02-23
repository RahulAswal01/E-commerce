const productmodel = require("../models/productmodel");
module.exports.singleItem = async (req, res) => {
  let alert = req.flash("tokenInfo");
  const product = await productmodel.findOne({ _id: req.params.product_id });
  // Convert buffer to base64 string
  const base64Image = product.productImage.toString("base64");

  // Build a data URI with MIME type
  const imageSrc = `data:${product.contentType};base64,${base64Image}`;
  res.render("singleitem", { product, imageSrc, alert });
};
