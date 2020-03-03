module.exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("is Authenticated");
    next();
  } else {
    console.log("is NOT Authenticated");
    res.status(401).json({
      message: 'User is not authenticate'
    });
  }
};

module.exports.isUserWhoCreated = (req, res, next) => {
  console.log(`USER = ${JSON.stringify(req.user)}`);
  console.log(`Params = ${JSON.stringify(req.params)}`);
  console.log(`Body = ${JSON.stringify(req.body)}`);
  next();
};