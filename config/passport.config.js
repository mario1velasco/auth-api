/**
 * Models
 */
const User = require('../models/user.model');

/**
 * Services
 */
const UserService = require('../services/user.service')

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
  passport.use('local-auth', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, async (email, password, next) => {
    try {
      const user = await UserService.getUserByEmail(email);
      if (!user) {
        return next(null, false);
      }
      let match = await user.checkPassword(password);
      if (!match) {
        return next(null, false);
      }
      return next(null, user);
    } catch (error) {
      return next(error);
    }
  }));

  passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  }, async (jwt_payload, next) => {
    try {
      const user = await UserService.getUserById(jwt_payload.sub);
      if (!user) {
        return next(null, false);
      } else {
        return next(null, user);
      }
    } catch (error) {
      return next(error);
    }
  }))
};
