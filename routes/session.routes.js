/**
 * Required External Modules
 */
const express = require('express');
const router = express.Router();

/**
 * Controllers
 */
const sessionController = require('../controllers/session.controller');

/**
 * Middleware
 */
const secureMiddleware = require('../middlewares/secure.middleware');

/**
 * Routes
 */
router.post('/authenticate', sessionController.authenticate);
// router.delete('/', sessionController.destroy);
router.delete('/', secureMiddleware.isAuthenticated, sessionController.destroy);

/**
 * Export
 */
module.exports = router;
