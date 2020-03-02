/**
 * Required External Modules
 */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


/**
 * App Variables
 */
var app = express();
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users.routes');

/**
 *  App Configuration
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 *  Ddbb Configuration
 */
require('./config/db.config');

/**
 * Routes Definitions
 */
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
