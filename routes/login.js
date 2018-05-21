var express = require('express');
var router = express.Router();
var business = require('../controller/business');
var lib = require('../controller/lib');

router.post('/', function (req, res, next) {
  var username = req.body['username'];
  var pass = req.body['password'];
  lib.SetCookie(resObject, 'id', username, 900000);
  res.redirect('/');
});

module.exports = router;
