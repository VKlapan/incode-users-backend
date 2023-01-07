const User = require("../../models/UserModel");

const getAllUsers = async (req, res) => {
  const response = await User.find();

  res.status(200).json({ code: 200, users: response });
};

module.exports = getAllUsers;
