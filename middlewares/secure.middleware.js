/**
 * Required External Modules
 */
const passport = require('passport');

/**
 * Helpers
 */
const { ErrorHandler } = require('../helpers/error.helper')

module.exports.isAuthenticated = (req,res,next) => {
  passport.authenticate('jwt', (err, user, info) => {
      console.log('Execute middleware isAuthenticated JWT');
      // console.log(`err = ${err}`);
      // console.log(`user = ${user}`);
      // console.log(`info = ${info}`);
      //si hubo un error relacionado con la validez del token (error en su firma, caducado, etc)
      if (info) { return next(new ErrorHandler(401, info.message)); }
      //si hubo un error en la consulta a la base de datos
      if (err) { return next(err); }
      //si el token está firmado correctamente pero no pertenece a un usuario existente
      if (!user) { return next(new ErrorHandler(401, 'You are not allowed to access.')); }

      //inyectamos los datos de usuario en la request
      req.user = user;
      next();
  })(req, res, next);
};

// Este middleware se tiene que ejecutar siempre después de canRoleAccess
// porque así ya tienes el user del Token
module.exports.isAdminOrSameUser = (req,res,next) => {
  console.log('Execute middleware isAdminOrSameUser JWT');
  const role = req.get('role') || 'public';
  const user = req.user;
  const userId = req.params.userid || req.body.userid;
  if (role !== 'admin' || !user) {
    return next(new ErrorHandler(401, 'You are not allowed to access.'));
  } else if (role === 'admin'){
    next();
  } else if (userId){
    // Llamar al servicio user services y compararlo con el que tienes
  }
};