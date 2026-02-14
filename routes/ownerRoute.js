const express = require("express");
const { ownercheck } = require("../controllers/ownercheck");
const { isOwner } = require("../middleware/isOwner");
const Router = express.Router();

if (process.env.NODE_ENV === "development") {
  Router.post("/createonwer", async (req, res) => {
    let checkowner = await ownermodel.find();
    if (checkowner.length > 0) return res.send("not able to create owner");
    let { email, password, name } = req.body;
    try {
      bcrypt.genSalt(12, async (err, salt) => {
        if (err) {
          return res.send(err.message);
        }
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) {
            return res.send(err.message);
          }
          let newOwner = await ownermodel.create({
            email,
            password: hash,
            name,
          });
          res.send(newOwner);
        });
      });
    } catch (err) {
      res.send(err);
    }
  });
}
Router.post("/ownercred", ownercheck);
Router.get("/createproduct", isOwner, (req, res) => {
  res.render("createProduct");
});
module.exports = Router;
