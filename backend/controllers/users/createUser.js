const bcrypt = require("bcrypt");
const User = require("../../models/UserModel");
const helpers = require("../../helpers");

const createUser = async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;

  if (!userEmail || !userName || !userPassword) {
    throw helpers.httpError(400, "Please, provide required fields");
  }

  const user = await User.findOne({ userEmail });

  if (user) {
    throw helpers.httpError(409, "User already exists. Please, login");
  }

  const hashPassword = bcrypt.hashSync(userPassword, 5);

  const newUser = await User.create({
    ...req.body,
    userPassword: hashPassword,
  });

  if (!newUser) {
    throw helpers.httpError(409, "Unable to save on DB");
  }

  return res.status(201).json({ code: 201, user: newUser });
};

module.exports = createUser;
