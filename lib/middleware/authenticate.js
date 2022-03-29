const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  /*
    TODO: Check for the session cookie and verify
    its contents using jsonwebtoken, then
    assign the payload to req.user
  */

  try {
    const session = req.cookies[process.ENV.COOKIE_NAME];
    if (!session) throw new Error('You must be signed in to continue');

    const payload = jwt.verify(session, process.env.JWT_SECRET);
    req.user = payload;

    next();
  } catch (error) {
    error.status = 401;
    next(error);
  }
};
