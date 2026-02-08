const usermodel = require("../models/usermodel");
const bcrypt = require("bcrypt");

module.exports.createUser = async (req, res) => {
  let { fullName, email, password, contactNo } = req.body;
  let checkUser = await usermodel.findOne({ email: email });
  if (checkUser) {
    // await usermodel.deleteMany({});
    return res.send("User already exits");
  }
  bcrypt.genSalt(12, (err, salt) => {
    if (err) {
      throw err;
    }
    bcrypt.hash(password, salt, async (err, hash) => {
      let createdUser = await usermodel.create({
        fullName,
        email,
        password: hash,
        contact: contactNo,
      });
      return res.redirect("/");
    });
  });
};
