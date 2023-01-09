const User = require("../../models/UserModel");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;

  if (!userEmail || !userName || !userPassword) {
    return res
      .status(400)
      .json({ code: 400, message: "Please, provide required fields" });
  }

  const user = await User.findOne({ userEmail });

  if (user) {
    return res
      .status(409)
      .json({ code: 409, message: "User already exists. Please, login" });
  }

  const hashPassword = bcrypt.hashSync(userPassword, 5);

  const newUser = await User.create({
    ...req.body,
    userPassword: hashPassword,
  });
  if (!newUser) {
    return res.status(400).json({ code: 400, message: "Unable to save on DB" });
  }

  return res.status(201).json({ code: 201, user: newUser });
};

module.exports = createUser;
