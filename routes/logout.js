var express = require('express');
var router = express.Router();
var lib = require('../controller/lib');


router.get('/', function (req, res, next) {
  lib.RemoveCookie(res,'id');
  res.redirect('/');
});

module.exports = router;
