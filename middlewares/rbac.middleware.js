/**
 * Required External Modules
 */
import { newEnforcer } from 'casbin';
var path = require('path');
const fs = require('fs');

/**
 * Helpers
 */
const { ErrorHandler } = require('../helpers/error.helper')

/**
 * Constants
 */

module.exports.canRoleAccess = async (req,res,next) => {
  // var relativePath = path.relative(process.cwd(), 'rbac_model.conf');
  // console.log(JSON.stringify(relativePath));

  console.log(fs.existsSync('/home/mario/mis-proyectos/auth/auth-api/security/rbac_model.conf'));
  if (fs.existsSync('/home/mario/mis-proyectos/auth/auth-api/security/rbac_model.conf')) {
    const enforcer = await newEnforcer(
      '/home/mario/mis-proyectos/auth/auth-api/security/rbac_with_pattern_model.conf',
      '/home/mario/mis-proyectos/auth/auth-api/security/rbac_policy_with_pattern_model.csv'
    );

    const permissions = await enforcer.getImplicitPermissionsForUser("alice")
    console.log(`PERMISSiONS = ${JSON.stringify(permissions)}`);
    const roles = enforcer.getRolesForUser('book_admin');
    console.log(`ROLES = ${JSON.stringify(roles)}`);

    const res = await enforcer.enforce('alice', '/alice_data/123', 'GET');
    if (res) {
      console.log("YEs");

      // permit alice to read data1
    } else {
      console.log("NO");
      // deny the request, show an error
    }
    const res2 = await enforcer.enforce('alice', '/alice_data/123/book/123', 'GET');
    if (res2) {
      console.log("YEs");

      // permit alice to read data1
    } else {
      console.log("NO");
      // deny the request, show an error
    }
  }
  // Here's a little confusing: the matching function here is not the custom function
  //  used in matcher.
  // It is the matching function used by "g" (and "g2", "g3" if any..)
  // You can see in policy that: "g2, /book/:id, book_group", so in "g2()" function in the
  // matcher, instead
  // of checking whether "/book/:id" equals the obj: "/book/1", it checks whether the pattern
  // matches.
  // You can see it as normal RBAC: "/book/:id" == "/book/1" becomes
  // KeyMatch2("/book/:id", "/book/1")
  // e.rm.(*defaultrolemanager.RoleManager).AddMatchingFunc("KeyMatch2", util.KeyMatch2)
  // testEnforce(t, e, "alice", "/book/1", "GET", true)
  // testEnforce(t, e, "alice", "/book/2", "GET", true)
  // testEnforce(t, e, "alice", "/pen/1", "GET", true)
  // testEnforce(t, e, "alice", "/pen/2", "GET", false)
  // testEnforce(t, e, "bob", "/book/1", "GET", false)
  // testEnforce(t, e, "bob", "/book/2", "GET", false)
  // testEnforce(t, e, "bob", "/pen/1", "GET", true)
  // testEnforce(t, e, "bob", "/pen/2", "GET", true)

  // #  	// AddMatchingFunc() is actually setting a function because only one function is allowed,
  // #  	// so when we set "KeyMatch3", we are actually replacing "KeyMatch2" with "KeyMatch3".
  // #  	e.rm.(*defaultrolemanager.RoleManager).AddMatchingFunc("KeyMatch3", util.KeyMatch3)
  // #  	testEnforce(t, e, "alice", "/book2/1", "GET", true)
  // #  	testEnforce(t, e, "alice", "/book2/2", "GET", true)

  res.status(200).json({ message: 'Success canRoleAccess' });
};