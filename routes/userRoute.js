const express = require("express");

const Router = express.Router();
const { createUser } = require("../controllers/authController");
const { loginUser } = require("../controllers/loginController");

Router.post("/createuser", createUser);

Router.post("/login", loginUser);

module.exports = Router;
