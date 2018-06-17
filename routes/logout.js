var express = require('express');
var router = express.Router();
var lib = require('../controller/lib');


router.get('/', function (req, res, next) {
  req.session.destroy(function(err) {
    console.log('Logout successfully');
  })

  res.redirect(req.get('referer'));
});

module.exports = router;
