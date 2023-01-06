const getAllUsers = async (req, res) => {
  res.status(200).json({ code: 200, message: "Get All" });
};

module.exports = getAllUsers;
