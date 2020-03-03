/**
 * Required External Modules
 */
const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports.authenticate = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    res.status(400).json({
      message: 'Email, password are required'
    });
  } else {
    passport.authenticate('local-auth', (err, user, message) => {
      if (err) {
        next(err);
      } else if (!user) {
        res.status(401).json(message);
      } else {
        const payload = {
          sub: user._id,
          iat: Date.now() + parseInt(process.env.JWT_EXPIRATION),
          username: user.email,
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          data: 'foobar',
        };
        console.log(`PAYLOAD = ${JSON.stringify(payload)}`);
        const token = jwt.sign(
          payload,
          process.env.JWT_SECRET,
        );
        console.log(`TOKEN =  ${token}`);
        res.json({ data: { token: token } });
      }
    })(req, res, next);
  }
};

module.exports.destroy = (req, res, next) => {
  console.log('Session destroy');
  req.logout();
  res.status(200).json({ message: 'Success' });
};