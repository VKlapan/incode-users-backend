const User = require("../../models/UserModel");

const getAllUsers = async (req, res) => {
  const { _id: id, role } = req.user;

  const user = await User.findById(id);

  switch (role) {
    case "user":
      res.status(200).json({ code: 200, user: user });
      break;
    case "boss":
      const userSubordinatesTree = await getUserSubordinatesTree(user);

      res.status(200).json({
        code: 200,
        data: userSubordinatesTree,
      });

      break;
    case "admin":
      const users = await User.find();
      res.status(200).json({ code: 200, users: users });
      break;
  }
};

async function getUserSubordinatesTree(user) {
  const userSubordinates = await User.find({ boss: user._id });

  if (userSubordinates.length === 0) {
    return { user, subordinates: [] };
  }
  const userSubordinatesNodes = await Promise.all(
    userSubordinates.map(getUserSubordinatesTree)
  );

  return { user, subordinates: userSubordinatesNodes };
}

module.exports = getAllUsers;
