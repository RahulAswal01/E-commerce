const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:mongoose");
mongoose
  .connect(`${config.get("mongodb_uri")}/sheryDB`)
  .then(() => {
    dbgr("mongodb connected");
  })
  .catch((err) => {
    dbgr(err);
  });
module.exports = mongoose.connection;
