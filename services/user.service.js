/**
 * Required External Modules
 */
const mongoose = require('mongoose');

/**
 * Models
 */
const User = require('../models/user.model');

/**
 * Instance Methods
 */
let getUserById = async (id) => {
  return await User.findById(id)
};

let getUserByEmail = async (email) => {
  return await User.findOne({ email: email });
};

let updateUser = async (id, user) => {
  const updatedUser = await User.findByIdAndUpdate(id, user, {new: true});
  return updatedUser;
};

let deleteUser = async (id, user) => {
  const deletedUser = await User.findByIdAndRemove(id);
  return deletedUser;
};

/**
 * Export
 */
module.exports = {
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser
}