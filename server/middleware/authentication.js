const jwt = require('jsonwebtoken');

module.exports = {
//Create at JSON Web Token for logged in user
  generateToken: (email) => {
    const token = {};

    token.accessToken = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      data: email,
    }, process.env.TOKEN);
    console.log(process.env)
    return token;
  },

//Verify user before redirecting to main page
  verifyUserWithJWT: (req, res, next) => {
    try {
      console.log(req)
      console.log('MIDDLEWARE BODY:', req.body);
      console.log('TOKEN ON SERVER SIDE: ', req.headers.authorization, ' HEADERS=', req.headers);
      jwt.verify(req.headers.authorization, process.env.TOKEN);
      console.log('token verified');
      next();
    } catch (e) {
      console.log('token not verified', e);
      next(e);
    }
  }
}
