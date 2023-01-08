const User = require("../../models/UserModel");

const getAllUsers = async (req, res) => {
  const { _id: id, role } = req.user;

  const user = await User.findById(id);

  switch (role) {
    case "user":
      res.status(200).json({ code: 200, user: user });
      break;
    case "boss":
      let boss_subordinates = await getSubSubordinates([{ id }]);
      let iterationSubordinates = boss_subordinates;

      do {
        iterationSubordinates = await getSubSubordinates(iterationSubordinates);
        boss_subordinates = [...boss_subordinates, ...iterationSubordinates];
      } while (iterationSubordinates.length > 0);

      res.status(200).json({
        code: 200,
        user: user,
        subordinates: boss_subordinates,
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
