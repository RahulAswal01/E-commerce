const express = require("express");
const Router = express.Router();

Router.get("/", (req, res) => {
  res.send("hello from user router");
});

module.exports = Router;
