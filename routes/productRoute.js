const express = require("express");
const productmodel = require("../models/productmodel");
const usermodel = require("../models/usermodel");
const { addToCart } = require("../controllers/addToCart");
const { isOwner } = require("../middleware/isOwner");
const { upload } = require("../config/multerconfig");
const { productsHome } = require("../controllers/productsHome");
const { singleItem } = require("../controllers/singleItem");
const { isLogin } = require("../middleware/isLogin");
const { logout } = require("../controllers/logout");
const { createProduct } = require("../controllers/createProduct");
const { cartView } = require("../controllers/cartView");
const { removecart } = require("../controllers/removeCart");
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

Router.get("/cart/remove/:product_id", isLogin, removecart);

Router.get("/cart", isLogin, cartView);

Router.get("/logout", isLogin, logout);

module.exports = Router;
