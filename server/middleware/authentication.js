const jwt = require('jsonwebtoken');

module.exports = {
  generateToken: ({ email }) => {
    const token = {};

    token.accessToken = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      email,
    }, process.env.TOKEN_SECRET);

    return token;
  },

  verifyUserWithJWT: (req, res, next) => {
    try {
      console.log('MIDDLEWARE BODY:', req.body);
      console.log('TOKEN ON SERVER SIDE: ', req.headers.authorization, ' HEADERS=', req.headers);
      jwt.verify(req.headers.authorization, process.env.TOKEN_SECRET);
      console.log('token verified');
      next();
    } catch (e) {
      console.log('token not verified', e);
      next(e);
    }
  }
}
