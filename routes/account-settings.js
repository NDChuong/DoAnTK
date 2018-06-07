var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  var loginStatus = false;
  // Check login status
  if (req.session.userid != undefined) {
    // User already logged in
    loginStatus = true;
  }


  res.send('respond with a resource');
});

module.exports = router;
