/**
 * Required External Modules
 */
const passport = require('passport');
const jwt = require('jsonwebtoken');

/**
 * Helpers
 */
const { ErrorHandler } = require('../helpers/error.helper')

/**
 * Middlewares
 */
const { asyncWrapper } = require('../middlewares/async.middleware')

module.exports.authenticate = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new ErrorHandler(404, 'Missing required email and password fields')
  }
  passport.authenticate('local-auth', (error, user) => {
    if (error || !user) {
      next( new ErrorHandler(404, 'username or password not correct.'))
    } else {
      const payload = {
        sub: user._id,
        username: user.email,
        // 1 hora
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        // 6 segundos
        // exp: Math.floor(Date.now() / 1000) + (6),
      };
      const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
      );
      res.json({ data: { token: token, user:user } });
    }
  })(req, res, next);
});

module.exports.destroy = (req, res, next) => {
  req.logout();
  res.status(200).json({ message: 'Success DESTROY' });
};