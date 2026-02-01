const express = require("express");
const Router = express.Router();

Router.get("/", (req, res) => {
  res.send("hello from owner router");
});

module.exports = Router;
