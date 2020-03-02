/**
 * Required External Modules
 */
var express = require('express');
var router = express.Router();

/**
 * Routes
 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
 * Export
 */
module.exports = router;
