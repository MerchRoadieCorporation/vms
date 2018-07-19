const router = require('express').Router();
const authUser = require('../controllers/user');
const jwt = require('../middleware/authentication');
const dbController = require('../database/controllers/controller');

router.route('/login')
  .post(authUser);

router.route('/main')
  .get(jwt.verifyUserWithJWT, dbController.get);

router.route('/filteredsales')
  .post(dbController.filteredSales);

  module.exports = router;
