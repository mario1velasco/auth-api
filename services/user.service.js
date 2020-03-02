const User = require('../models/user.model');
const mongoose = require('mongoose');

let getUserById = async (id) => {
  return await User.findOne({
    _id: mongoose.Types.ObjectId(id),
  });
};

let getUserByEmail = async (email) => {
  return await User.findOne({ email: email });
};

let updateUser = async (id, user) => {
  const updatedBookmark = await Bookmark.findOneAndUpdate(
    {
      _id: mongoose.Types.ObjectId(id),
    },
    user,
    {new: true}
  );
  return await User.findOne({ email: email });
};

module.exports = {
  getUserById,
  getUserByEmail,
  updateUser
}