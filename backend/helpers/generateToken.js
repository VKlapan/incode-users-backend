const jwt = require("jsonwebtoken");

const generateToken = (data) => {
  const payload = { data };

  return jwt.sign(payload, "pizzaSecret", {
    expiresIn: "2h",
  });
};

module.exports = generateToken;
