const router = require('express').Router();
const controller = require('../controllers/controller.js');
const authUser = require('../controllers/user');
const jwt = require('../middleware/authentication');

router.route('/login')
  .post(authUser);

router.route('/main')
  .get(jwt.verifyUserWithJWT, controller.test);

  module.exports = router;
