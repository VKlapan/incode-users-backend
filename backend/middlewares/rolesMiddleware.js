const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/UserModel");
const helpers = require("../helpers");

const rolesMiddleware = (requiredRole) => {
  return async (req, res, next) => {
    try {
      if (!req.header("authorization")) {
        throw helpers.httpError(401, "Please, provide a token");
      }

      const [tokenType, token] = req.header("authorization").split(" ");

      if (!token || tokenType !== "Bearer") {
        throw helpers.httpError(401, "Please, provide a token");
      }

      const decoded = jwt.verify(token, process.env.SECRET);

      const { roles, id: bossId } = decoded.data;
      const { userid: id } = req.params;

      const user = await User.findById(id);

      if (requiredRole !== roles || bossId !== user.boss.toString()) {
        throw helpers.httpError(403, "You don't have permission");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = rolesMiddleware;
