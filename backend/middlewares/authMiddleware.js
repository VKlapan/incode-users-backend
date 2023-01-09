const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const dotenv = require("dotenv");
const helpers = require("../helpers");

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.header("authorization")) {
      throw helpers.httpError(401, "Please, provide a token");
    }

    const [tokenType, token] = req.header("authorization").split(" ");

    if (!token || tokenType !== "Bearer") {
      throw helpers.httpError(401, "Please, provide a token");
    }

    const decoded = jwt.verify(token, process.env.SECRET);
    const { id } = decoded.data;

    const user = await User.findById(id);

    if (!user) {
      throw helpers.httpError(401, "Please, provide a token");
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

// console.log("proteted Header: ", protectedHeader);

module.exports = authMiddleware;
