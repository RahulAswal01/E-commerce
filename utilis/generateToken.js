const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_KEY);
  //compulsory to use return here
};

module.exports.generateToken = generateToken;
