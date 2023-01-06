const jwt = require("jsonwebtoken");

const rolesMiddleware = (requiredRole) => {
  return (req, res, next) => {
    try {
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        const [Bearer, token] = req.headers.authorization.split(" ");

        if (!token) {
          return res.status(400).json({
            code: 400,
            message: "Please, provide token",
          });
        }

        const decoded = jwt.verify(token, "pizzaSecret");
        const { role } = decoded.data;
        if (requiredRole !== role) {
          return res
            .status(403)
            .json({ code: 403, message: "You don't have permission" });
        }
      }

      next();
    } catch (error) {
      return res.status(403).json({ code: 403, message: "Unauthorized" });
    }
  };
};

module.exports = rolesMiddleware;
