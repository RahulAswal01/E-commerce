const productmodel = require("../models/productmodel");

module.exports.createProduct = async (req, res) => {
  let {
    productName,
    backgroundColor,
    productPrice,
    discount,
    panelColor,
    textColor,
  } = req.body;
  await productmodel.create({
    productName,
    contentType: req.file.mimetype,
    backgroundColor,
    productPrice,
    discount,
    panelColor,
    textColor,
    productImage: req.file.buffer,
  });
  req.flash("success", "Product created successfully");
  res.redirect("/owner/createproduct");
};
