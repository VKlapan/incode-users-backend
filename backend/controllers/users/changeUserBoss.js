const User = require("../../models/UserModel");
const bcrypt = require("bcrypt");

const changeUserBoss = async (req, res) => {
  const { userid } = req.params;
  const [tokenType, token] = req.header("authorization").split(" ");
  const { bossId: newBoss } = req.body;

  return res.status(201).json({ code: 201, userid, token, newBoss });
};

module.exports = changeUserBoss;
