/**
 * Required External Modules
 */
const express = require('express');
const router = express.Router();

/**
 * Controllers
 */
const usersController = require('../controllers/users.controller');
// const secureMiddleware = require('../middleware/secure.middleware');

/**
 * Routes
 */
router.post('/', usersController.create);
router.get('/:id', usersController.get);
router.put('/:id', usersController.edit);
router.delete('/:id', usersController.destroy);
// router.get('/:id', secureMiddleware.isAuthenticated, usersController.get);
// router.get('/:id/object', secureMiddleware.isAuthenticated, usersController.getByObjectId);
// router.put('/:id', secureMiddleware.isAuthenticated, usersController.edit);

/**
 * Export
 */
module.exports = router;