const mongoose = require("mongoose");

const postschema = mongoose.Schema({
  image: String,
  name: String,
  bgColor: String,
  price: Number,
  discount: String,
  panelColor: String,
  textColor: String,
});

module.exports = mongoose.model("product", postschema);
