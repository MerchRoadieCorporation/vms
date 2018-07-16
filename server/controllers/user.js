const jwt = require('../middleware/authentication');
const firebase = require('./firebase.config')
const auth = require('./firebase.config')

//Authorize user through Firebase
const authUser = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  auth.signInWithEmailAndPassword(email, password)
    .then((user) => {
      const token = jwt.generateToken(email);
      res.status(200).send(token);
    }, (err) => {
      res.status(204).send(err);
    });
};

module.exports = authUser;
