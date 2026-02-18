const express = require("express");
const productmodel = require("../models/productmodel");
const usermodel = require("../models/usermodel");
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

Router.get("/addToCart/:productId", isLogin, async (req, res) => {
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
