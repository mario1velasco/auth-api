/**
 * Required External Modules
 */
import { newEnforcer } from 'casbin';
const {resolve} = require("path")

/**
 * Helpers
 */
const { ErrorHandler } = require('../helpers/error.helper')

module.exports.canRoleAccess = async (req,res,next) => {
  console.log("ejecutando canRoleAccess RBAC");
  // Casbin crea un plan con las rutas accesibles para cada rol
  const enforcer = await newEnforcer(
    resolve('../auth-api/security/rbac_model.conf'),
    resolve('../auth-api/security/rbac_policy.csv')
  );
  const role = req.get('role') || 'public';
  const method = req.method;
  const url = req.baseUrl;
  // console.log(`role = ${role}`);
  // console.log(`method = ${method}`);
  // console.log(`url = ${url}`);

  // Se chequea que el rol pueda acceder
  const canAccess = await enforcer.enforce(role, url, method);
  if (canAccess) {
    next();
  } else {
    return next(new ErrorHandler(401, "You are not allowed to access."));
  }
};