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
const {isAuthenticated} = require('../middlewares/secure.middleware');
const {canRoleAccess} = require('../middlewares/rbac.middleware');

/**
 * Routes
 */
router.post('/authenticate', sessionController.authenticate);
router.delete('/', canRoleAccess, isAuthenticated, sessionController.destroy);
// router.delete('/', sessionController.destroy);
// router.delete('/', secureMiddleware.isAuthenticated, sessionController.destroy);

/**
 * Export
 */
module.exports = router;
