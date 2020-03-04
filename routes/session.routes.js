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
const rbacMiddleware = require('../middlewares/rbac.middleware');

/**
 * Routes
 */
router.post('/authenticate', sessionController.authenticate);
router.delete('/', rbacMiddleware.canRoleAccess, secureMiddleware.isAuthenticated, sessionController.destroy);
// router.delete('/', sessionController.destroy);
// router.delete('/', secureMiddleware.isAuthenticated, sessionController.destroy);

/**
 * Export
 */
module.exports = router;
