const express = require("express");
const productmodel = require("../models/productmodel");
const { addToCart } = require("../controllers/addToCart");
const { isOwner } = require("../middleware/isOwner");
const { upload } = require("../config/multerconfig");
const { productsHome } = require("../controllers/productsHome");
const { singleItem } = require("../controllers/singleItem");
const { isLogin } = require("../middleware/isLogin");
const { logout } = require("../controllers/logout");
const { createProduct } = require("../controllers/createProduct");
const Router = express.Router();

Router.get("/home", isLogin, productsHome);

Router.get("/addToCart/:productId", isLogin, addToCart);

Router.post(
  "/onwer/createProduct",
  upload.single("productImage"),
  isOwner,
  createProduct,
);

Router.get("/bag/:product_id", isLogin, singleItem);

Router.get("/payment", isLogin, (req, res) => {
  res.send("payment gateway");
});

Router.get("/logout", isLogin, logout);

module.exports = Router;
