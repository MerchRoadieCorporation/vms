const jwt = require('jsonwebtoken');

module.exports = {
//Create at JSON Web Token for logged in user
  generateToken: (email) => {
    const token = {};

    token.accessToken = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      data: email,
    }, process.env.TOKEN);
    return token;
  },

//Verify user before redirecting to main page
  verifyUserWithJWT: (req, res, next) => {
    try {
      jwt.verify(req.headers.authorization, process.env.TOKEN);
      next();
    } catch (e) {
      next(e);
    }
  }
}
