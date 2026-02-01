const express = require("express");

const app = express();
const mongoose = require("mongoose");
const usermodel = require("./models/usermodel");
const productmodel = require("./models/productmodel");

app.get("/", (req, res) => {
  res.send("hey i am rahul");
});

app.listen(3000);
