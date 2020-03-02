const mongoose = require('mongoose');
const User = require('../models/user.model');
const { ErrorHandler } = require('../helpers/error')
import { runAsyncWrapper } from '../middlewares/asyncMiddleware';

module.exports.get = runAsyncWrapper(async (req, res, next) => {
  const id = req.params.id
  if (!id ) {
    throw new ErrorHandler(404, 'Missing required id fields')
  }
  const user = await User.findOne({ _id: mongoose.Types.ObjectId(id) });
  if (!user) {
    throw new ErrorHandler(404, 'User does not exists')
  }
  res.status(200).json(user);
})

// const get = async (req, res, next) => {
//   try {
//     const { email, password } = req.body
//     if (!email || !password) {
//       throw new ErrorHandler(404, 'Missing required email and password fields')
//     }
//     const user = await  db.User.findOne({ where: { email }});
//     if (!user) {
//       throw new ErrorHandler(404, 'User with the specified email does not exists')
//     }
//     next()
//   } catch (error) {
//     next(error)
//   }
// }


