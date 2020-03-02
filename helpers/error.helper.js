/**
 * Constructor
 */
class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

/**
 * Instance methods
 */
function handleError(err, res) {
  const status = err.statusCode || 500
  res.status(status);
  res.json({
    message: err.message,
    status: "error",
    statusCode: status,
    errors: err.errors
  });
};

/**
 * Export
 */
module.exports = {
  ErrorHandler,
  handleError
}