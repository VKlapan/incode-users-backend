const User = require("../../models/UserModel");

const getAllUsers = async (req, res) => {
  const { _id: id, role } = req.user;

  const user = await User.findById(id);

  switch (role) {
    case "user":
      res.status(200).json({ code: 200, user: user });
      break;
    case "boss":
      //      const subordinates = await User.find({ boss: id });
      const boss_subordinates = await getSubSubordinates([{ id }]);

      const boss_subordinates_subordinates = await getSubSubordinates(
        boss_subordinates
      );

      const boss_subordinates_subordinates_subordinates =
        await getSubSubordinates(boss_subordinates_subordinates);

      res.status(200).json({
        code: 200,
        user: user,
        result: [
          boss_subordinates_subordinates,
          boss_subordinates_subordinates_subordinates,
        ],
      });

      break;
    case "admin":
      const users = await User.find();
      res.status(200).json({ code: 200, users: users });
      break;
  }
};

function getSubSubordinates(subordinates) {
  return Promise.all(
    subordinates.map(({ id }) => id).map(getOwnSubordinates)
  ).then((list) => list.flat(1));
}

function getOwnSubordinates(id) {
  return User.find({ boss: id });
}

module.exports = getAllUsers;
