/**
 * Helpers
 */
const { ErrorHandler } = require('../helpers/error.helper')
const UserHelper = require('../helpers/user.helper')

/**
 * Services
 */
const UserService = require('../services/user.service')

/**
 * Middlewares
 */
const { asyncWrapper } = require('../middlewares/async.middleware')

module.exports.get = asyncWrapper(async (req, res, next) => {
  const id = req.params.id
  if (!id ) {
    throw new ErrorHandler(404, 'Missing required id fields')
  }
  const user = await UserService.getUserById(id)
  if (!user) {
    throw new ErrorHandler(404, `User NOT_FOUND for id: ${id} `);
  }
  res.status(200).json(user);
})

module.exports.create = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new ErrorHandler(404, 'Missing required email and password fields')
  }
  const user = await UserService.getUserByEmail(email);
  if (user) {
    throw new ErrorHandler(409, 'User with the specified email already exists')
  }
  const newUser = await UserHelper.createUserFromRequest(req);
  const ret = await newUser.save();
  res.status(200).json(ret);
})

module.exports.edit = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  if (!id ) {
    throw new ErrorHandler(404, 'Missing required id fields')
  }
  const userUpdated = await UserService.updateUser(id, req.body);
  if (!userUpdated) {
    throw new ErrorHandler(404, 'User does not exists')
  }
  res.status(200).json(userUpdated);
})

module.exports.destroy = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  if (!id ) {
    throw new ErrorHandler(404, 'Missing required id fields')
  }
  const userDeleted = await UserService.deleteUser(id, req.body);
  if (!userDeleted) {
    throw new ErrorHandler(404, 'User does not exists')
  }
  res.status(204).json(userDeleted);
})
