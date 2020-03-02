/**
 * Models
 */
const User = require('../models/user.model');

/**
 * Instance methods
 */
let createUserFromRequest = async (req) => {
  return await new User({
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    telephone: req.body.telephone,
    about: req.body.about,
  });
};

/**
 * Export
 */
module.exports = {
  createUserFromRequest
}