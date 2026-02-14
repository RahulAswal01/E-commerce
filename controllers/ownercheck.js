const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ownermodel = require("../models/ownermodel");

module.exports.ownercheck = async (req, res) => {
  let { email, password } = req.body;
  let owner = await ownermodel.findOne({ email: email });
  if (!owner) {
    return res.redirect("/");
  }
  bcrypt.compare(password, owner.password, (error, result) => {
    if (error) {
      return res.send(error.message);
    }
    if (result) {
      let token = jwt.sign({ email }, process.env.OWNERSECRETKEY, {
        expiresIn: "30min",
      });
      res.cookie("ownertoken", token);
      return res.redirect("/owner/createproduct");
    }
    res.redirect("/");
  });
};
