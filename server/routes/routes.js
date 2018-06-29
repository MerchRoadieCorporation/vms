const router = require('express').Router();
const controller = require('../controllers/controller.js');
const authUser = require('../controllers/user');
const jwt = require('../middleware/authentication');

router.route('/test')
  .post(controller.test);

router.route('/login')
  .post(authUser);

router.route('/main')
  .get(jwt.verifyUserWithJWT, controller.test);

  module.exports = router;
