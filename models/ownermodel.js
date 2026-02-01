const mongoose = require("mongoose");

const ownerschema = mongoose.Schema({
  picture: String,
  name: String,
  email: String,
  password: Number,
  product: [],
  gstno: String,
});

module.exports = mongoose.model("onwer", ownerschema);
