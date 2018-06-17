var express = require('express');
var router = express.Router();
var business = require('../controller/business');
var lib = require('../controller/lib');

router.post('/', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  var loginStatus = false;
  // Check login status
  if (req.session.userid != undefined) {
    // User already logged in
    loginStatus = true;
  }

  // Code here
  var user = {
    username: req.body.username,
    password: req.body.rawPWD
  }
  business.RegisterAccount(user);
  

});


module.exports = router;