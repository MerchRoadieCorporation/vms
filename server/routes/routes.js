const router = require('express').Router();
// const controller = require('../controllers/controller.js');
const authUser = require('../controllers/user');
const jwt = require('../middleware/authentication');
const dbController = require('../database/controllers/controller');

router.route('/login')
  .post(authUser);

router.route('/sales')
  .post(dbController.sales)

router.route('/main')
  .get(jwt.verifyUserWithJWT, dbController.sales);

  module.exports = router;
