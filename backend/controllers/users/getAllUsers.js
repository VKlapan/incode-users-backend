const User = require("../../models/UserModel");

const getAllUsers = async (req, res) => {
  const { _id: id, role } = req.user;

  const user = await User.findById(id);

  switch (role) {
    case "user":
      res.status(200).json({ code: 200, user: user });
      break;
    case "boss":
      let subordinates = await User.find({ boss: id });
      let subordinates_objects = createUsersObjects(subordinates);

      let inner_subordinates = subordinates_objects;

      do {
        inner_subordinates = await getSubSubordinates(inner_subordinates);
      } while (inner_subordinates.length > 0);

      res.status(200).json({
        code: 200,
        user: user,
        subordinates: subordinates_objects,
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
    subordinates.map(async (userObject) => {
      return (userObject.subordinates = createUsersObjects(
        await getOwnSubordinates(userObject.user._id)
      ));
    })
  ).then((list) => list.flat(1));
}

function getOwnSubordinates(id) {
  return User.find({ boss: id });
}

function createUsersObjects(subordinates) {
  return subordinates.map((user) => (userObject = { user }));
}

module.exports = getAllUsers;
