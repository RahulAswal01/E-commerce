const express = require("express");
const productmodel = require("../models/productmodel");
const { isOwner } = require("../middleware/isOwner");
const { upload } = require("../config/multerconfig");
const { isLogin } = require("../middleware/isLogin");
const Router = express.Router();

Router.get("/home", isLogin, async (req, res) => {
  let alert = req.flash("tokenInfo");
  let products = await productmodel.find();
  // Convert buffer to base64 string
  products = products.map((p) => ({
    ...p.toObject(),
    productImageBase64: p.productImage.toString("base64"),
  }));

  res.render("product.ejs", { alert, products });
});

Router.get("/addToCart/:productId", isLogin, (req, res) => {
  res.send("meri babu no. 1");
});

Router.post(
  "/onwer/createProduct",
  upload.single("productImage"),
  isOwner,
  async (req, res) => {
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
  },
);

Router.get("/logout", isLogin, (req, res) => {
  res.clearCookie("token");
  req.flash("tokenInfo", "logout sucessfull");
  res.redirect("/");
});

module.exports = Router;
