const jwt = require('../middleware/authentication');
const firebase = require('./firebase.config')
const auth = require('./firebase.config')

const authUser = (req, res) => {
  // let name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  // console.log(email, password)
  // let arr = [name, email, password];
  // res.status(200).send(arr);
  auth.signInWithEmailAndPassword(email, password)
    .then((user) => {
      const token = jwt.generateToken(email);
      res.status(200).send(token);
    }, (err) => {
      console.log('there was an error loggin in the user', err);
      res.status(204).send(err);
    });
};

module.exports = authUser;
