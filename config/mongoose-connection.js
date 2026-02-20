const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:mongoose");
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    dbgr("mongodb connected");
    console.log("mongodb connected");
  })
  .catch((err) => {
    dbgr(err);
    console.log(err);
  });
module.exports = mongoose.connection;
