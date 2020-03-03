/**
 * Models
 */
const User = require('../models/user.model');

/**
 * Strategies
 */
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;

/**
 * Variables
 */
let ExtractJwt = require('passport-jwt').ExtractJwt;


module.exports.setup = (passport) => {
  // passport.serializeUser((user, next) => {
  //   next(null, user._id);
  // });

  // passport.deserializeUser((id, next) => {
  //   User.findById(id)
  //     .then(user => {
  //       next(null, user);
  //     })
  //     .catch(error => next(error));
  // });

  passport.use('local-auth', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, next) => {
    User.findOne({ email: email })
      .then(user => {
        // console.log(`User = ${JSON.stringify(user)}`);
        // console.log(`Email = ${JSON.stringify(email)}`);
        if (!user) {
          next(null, null, { message: 'Invalid email or password' });
        } else {
          user.checkPassword(password)
          .then(match => {
            if (match) {
              next(null, user);
            } else {
              next(null, null, { message: 'Invalid email or password' });
            }
          })
          .catch(error => next(error));
        }
      })
      .catch(error => next(error));
  }));

  passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret',
    issuer: 'accounts.examplesoft.com',
    audience: 'yoursite.net',
  }, (jwt_payload, done) => {
    User.findOne({id: jwt_payload.sub}) // jwt_payload.id
    .then((err, user) => {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    })
    .catch(error => next(error));
  }))
};
