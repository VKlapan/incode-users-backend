const bcrypt = require("bcrypt");
const User = require("../../models/UserModel");
const helpers = require("../../helpers");
const generateToken = require("../../helpers/generateToken");

const loginUser = async (req, res) => {
  const { userEmail, userPassword } = req.body;

  if (!userEmail || !userPassword) {
    throw helpers.httpError(409, "Please, provide required fields");
  }

  const user = await User.findOne({ userEmail });

  if (!user) {
    throw helpers.httpError(409, "Wrong login or password");
  }

  const isValidPassword = bcrypt.compareSync(userPassword, user.userPassword);

  if (!isValidPassword) {
    throw helpers.httpError(409, "Wrong login or password");
  }

  const data = { id: user._id, roles: user.role };
  user.token = generateToken(data);
  await user.save();

  if (!user.token) {
    throw helpers.httpError(409, "Unable create token");
  }

  return res.status(200).json({
    code: 200,
    data: {
      email: user.userEmail,
      token: user.token,
    },
  });
};

module.exports = loginUser;
