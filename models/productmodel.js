const mongoose = require("mongoose");

const postschema = mongoose.Schema({
  productImage: String,
  productName: String,
  backgroundColor: String,
  productPrice: Number,
  discount: String,
  panelColor: String,
  textColor: String,
});

module.exports = mongoose.model("product", postschema);
