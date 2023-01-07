const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const generateToken = (data) => {
  const payload = { data };

  return jwt.sign(payload, process.env.SECRET, {
    expiresIn: "2h",
  });
};

module.exports = generateToken;
