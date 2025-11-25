// controllers/userController.js
const User = require('../models/User');

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

// (Optional) Get User logic can go here later

module.exports = { deleteUser };