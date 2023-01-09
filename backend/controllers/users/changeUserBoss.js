const User = require("../../models/UserModel");
const bcrypt = require("bcrypt");

const changeUserBoss = async (req, res) => {
  const { userid } = req.params;
  const [tokenType, token] = req.header("authorization").split(" ");
  const { bossId: newBoss } = req.body;

  const response = await User.findByIdAndUpdate(
    { _id: userid },
    { boss: newBoss }
  );

  return res
    .status(201)
    .json({ code: 201, message: "User's boss was changed" });
};

module.exports = changeUserBoss;
