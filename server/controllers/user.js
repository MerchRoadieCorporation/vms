const jwt = require('../middleware/authentication');
const firebase = require('firebase/app');
const auth = require('firebase/auth');

const authUser = (req, res) => {
  // let name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  // let arr = [name, email, password];
  // res.status(200).send(arr);
  auth.signInWithEmailAndPassword(email, password)
    .then((user) => {
      // console.log('User is signed in', user);
      const token = jwt.generateToken({ email });
      res.status(200).send(token);
      // do something with email;
    }, (err) => {
      console.log('there was an error loggin in the user', err);
      res.status(204).send(err);
    });
};

module.exports = authUser;
