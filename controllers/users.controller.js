// const mongoose = require('mongoose');
const User = require('../models/user.model');
const { ErrorHandler } = require('../helpers/error')
const Userservice = require('../services/user.service')
const { runAsyncWrapper } = require('../middlewares/asyncMiddleware')
// import { commonHelper } from '../helpers/common';

module.exports.get = runAsyncWrapper(async (req, res, next) => {
  const id = req.params.id
  if (!id ) {
    throw new ErrorHandler(404, 'Missing required id fields')
  }
  const user = await Userservice.getUserById(id)
  if (!user) {
    throw new ErrorHandler(404, `User NOT_FOUND for id: ${id} `);
  }
  res.status(200).json(user);
})

module.exports.create = runAsyncWrapper(async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new ErrorHandler(404, 'Missing required email and password fields')
  }
  const user = await Userservice.getUserByEmail(email);
  if (user) {
    throw new ErrorHandler(409, 'User with the specified email already exists')
  }
  const newUser = new User({
    email: email,
    password: password,
  });
  const ret = await newUser.save();
  res.status(200).json(ret);
})

module.exports.edit = runAsyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  if (!id ) {
    throw new ErrorHandler(404, 'Missing required id fields')
  }
  // CREAR UN HELPER
  // const bookmark = bookmarkHelper.buildBookmarkFromRequest(request);
  // CREAR UN HELPER

  const user = await User.findOne({ _id: mongoose.Types.ObjectId(id) });
  if (!user) {
    throw new ErrorHandler(404, 'User does not exists')
  }
  await User.updateOne(user, {$set: req.body}, {new: true})
  res.status(200).json(user);
})

module.exports.destroy = runAsyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  if (!id ) {
    throw new ErrorHandler(404, 'Missing required id fields')
  }
  const user = await User.findOne({ _id: mongoose.Types.ObjectId(id) });
  if (!user) {
    throw new ErrorHandler(404, 'User does not exists')
  }
  await User.findOneAndRemove({ _id: mongoose.Types.ObjectId(id) })
  res.status(204).json(user);
})
