var express = require('express');
var router = express.Router();
var business = require('../controller/business');
var lib = require('../controller/lib');

router.post('/', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  var user = business.GetAccountInfo(username);


  if (user != null && (username == user.id_user && password == user.password)) {

    req.session.userid = username;
    console.log('Login successfully');
    res.redirect('/');
  }
  else {
    console.log('login failed');
    res.send("login failed");
  }

});

// ======== This GET method is for debugging purpose ONLY
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
        console.log('Login failed');
        res.send("login failed");
      }
    }

    res.redirect('/');
  }
});
// ======== This GET method is for debugging purpose ONLY



module.exports = router;