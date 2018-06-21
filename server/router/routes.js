const router = require('express').Router();
const controller = require('../controller/controller.js');

router.route('/test')
  .post(controller.test);

  module.exports = router;