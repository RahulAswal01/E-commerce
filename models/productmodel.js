const mongoose = require("mongoose");

const postschema = mongoose.Schema({
  productImage: Buffer,
  contentType: String,
  productName: String,
  backgroundColor: String,
  productPrice: Number,
  discount: Number,
  panelColor: String,
  textColor: String,
});

module.exports = mongoose.model("product", postschema);
