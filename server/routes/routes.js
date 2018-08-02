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

router.route('/filteredtimesales')
  .post(dbController.filteredTimeSales);

router.route('/filteredeventsales')
  .post(dbController.filteredEventSales);

router.route('/getevents')
  .post(dbController.getEvents);

router.route('/createevent')
  .post(dbController.createEvent);

  module.exports = router;
