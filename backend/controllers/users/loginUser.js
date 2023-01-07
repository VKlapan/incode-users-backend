const User = require("../../models/UserModel");
const bcrypt = require("bcrypt");
const generateToken = require("../../helpers/generateToken");

const loginUser = async (req, res) => {
  // 1) перевіряємо, чи ввів користувач необхідні поля
  const { userEmail, userPassword } = req.body;

  if (!userEmail || !userPassword) {
    return res
      .status(400)
      .json({ code: 400, message: "Please, provide required fields" });
  }

  // 2) переврити поля на валідність:
  //    - шукаємо користувача в Базі

  const user = await User.findOne({ userEmail });

  //    - розшифровуємо пароль

  const isValidPassword = bcrypt.compareSync(userPassword, user.userPassword);

  // 3) Якщо логін чи пароль не валідні - повідомляємо про ввод некоректних даних

  if (!user || !isValidPassword) {
    return res
      .status(400)
      .json({ code: 400, message: "Wrong login or password" });
  }

  // 4) Якщо все валідне, то видаємо токен
  const data = { id: user._id, roles: user.role };
  user.token = generateToken(data);
  await user.save();

  if (!user.token) {
    return res.status(400).json({ code: 400, message: "Unable create token" });
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
