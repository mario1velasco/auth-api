/**
 * Required External Modules
 */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');

/**
 * App Variables
 */
var app = express();
// Routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users.routes');
const sessionRoutes = require('./routes/session.routes');
// Error
const { handleError } = require('./helpers/error.helper')

/**
 *  App Configuration
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());
/**
 *  Ddbb Configuration
 */
require('./config/db.config');
require('./config/passport.config').setup(passport);

/**
 * Routes Definitions
 */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/session', sessionRoutes);

/**
 * Error handler
 */
app.use((err, req, res, next) => {
  handleError(err, res);
});

/**
 * Export
 */
module.exports = app;
