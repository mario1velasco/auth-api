// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;

const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users.controller');
// const secureMiddleware = require('../middleware/secure.middleware');

// router.post('/', usersController.create);
router.get('/:id', usersController.get);
// router.get('/:id', secureMiddleware.isAuthenticated, usersController.get);
// router.get('/:id/object', secureMiddleware.isAuthenticated, usersController.getByObjectId);
// router.put('/:id', secureMiddleware.isAuthenticated, usersController.edit);

module.exports = router;