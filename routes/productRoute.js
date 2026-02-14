const express = require("express");
const productmodel = require("../models/productmodel");
const { isOwner } = require("../middleware/isOwner");
const { upload } = require("../config/multerconfig");
const Router = express.Router();

const { isLogin } = require("../middleware/isLogin");

Router.get("/home", isLogin, (req, res) => {
  let alert = req.flash("tokenInfo");
  res.render("product.ejs", { alert });
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
    let { buffer } = req.file;
    await productmodel.create({
      productName,
      backgroundColor,
      productPrice,
      discount,
      panelColor,
      textColor,
      productImage: buffer,
    });
    res.redirect("/owner/createproduct");
  },
);

Router.get("/logout", (req, res) => {
  res.clearCookie("token");
  req.flash("tokenInfo", "logout sucessfull");
  res.redirect("/");
});

module.exports = Router;
