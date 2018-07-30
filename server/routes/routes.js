const router = require('express').Router();
const authUser = require('../controllers/user');
const jwt = require('../middleware/authentication');
const dbController = require('../database/controllers/controller');

router.route('/login')
  .post(authUser);

router.route('/main')
  .get(jwt.verifyUserWithJWT, dbController.mrSales);

router.route('/mrsales')
  .post(dbController.mrSales);

router.route('/filteredsales')
  .post(dbController.filteredSales);

router.route('/getevents')
  .post(dbController.getEvents);

  module.exports = router;
