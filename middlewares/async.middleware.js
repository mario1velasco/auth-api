/**
 * Instance methods
 */
const asyncWrapper = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

/**
* Export
*/
module.exports = {
  asyncWrapper
}