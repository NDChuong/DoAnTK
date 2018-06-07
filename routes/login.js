var express = require('express');
var router = express.Router();
var business = require('../controller/business');
var lib = require('../controller/lib');

router.get('/', function (req, res, next) {
  // var username = req.body['username'];
  // var pass = req.body['password'];

  // Check login status
  if (req.session.userid != undefined) {
    // User already logged in
    res.redirect('/');
  }
  else {

    var username = req.param('username');
    var password = req.param('password');

    var user = business.GetAccountInfo(username);

    if (user != null) {
      if (username == user.id_user && password == user.password) {
        req.session.userid = username;
        console.log('Logged in successfully');
      }
      else {
        res.send("login failed");
      }
    }

    res.redirect('/');
  }
});

router.post('/', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  var user = business.GetAccountInfo(username);


  if (user != null) {
    if (username == user.id_user && password == user.password) {
      req.session.userid = username;
    }
    else {
      res.send("login failed");
    }
  }

  res.redirect('/');
});

module.exports = router;