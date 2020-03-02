class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
module.exports = {
  ErrorHandler,
  handleError
}

function handleError(err, res) {
  const status = err.statusCode || 500
  res.status(status);
  res.json({
    message: err.message,
    status: "error",
    statusCode: status,
    errors: err.errors
  });
  // const { statusCode, message } = err;
  // res.status(statusCode).json({
  //   status: "error",
  //   statusCode,
  //   message
  // });
};