const User = require("../../models/UserModel");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  // робимо валідацію обов"язкових полів - чи передали, чи ні
  //console.log(req.body);

  const { userName, userEmail, userPassword } = req.body;

  if (!userEmail || !userName || !userPassword) {
    return res
      .status(400)
      .json({ code: 400, message: "Please, provide required fields" });
  }

  // 1) шукаємо користувача в Базі даних

  const user = await User.findOne({ userEmail });
  //  якщо користувач є - пропонуємо залогінитись

  if (user) {
    return res
      .status(409)
      .json({ code: 409, message: "User already exists. Please, login" });
  }

  //  якщо користувача немає, то
  // 2) хешуємо пароль

  const hashPassword = bcrypt.hashSync(userPassword, 5);
  //console.log(hashPassword);

  // 3) зберігаємо користувача в Базі

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
