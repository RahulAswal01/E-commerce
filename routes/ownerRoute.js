const express = require("express");
const bcrypt = require("bcrypt");
const ownermodel = require("../models/ownermodel");
const { productManagement } = require("../controllers/productManagement");
const { ownercheck } = require("../controllers/ownercheck");
const { ownerLogout } = require("../controllers/ownerLogout");
const { deleteProduct } = require("../controllers/deleteProduct");
const { isOwner } = require("../middleware/isOwner");
const { createOwner } = require("../controllers/createOwner");
const Router = express.Router();

if (process.env.NODE_ENV === "development") {
  Router.post("/createowner", createOwner);
}
Router.post("/ownercred", ownercheck);
Router.get("/productManagement", isOwner, productManagement);
Router.get("/delete/:product_id", isOwner, deleteProduct);
Router.get("/logout", isOwner, ownerLogout);
Router.get("/createproduct", isOwner, (req, res) => {
  let alert = req.flash("success");
  res.render("createProduct", { alert });
});
module.exports = Router;
