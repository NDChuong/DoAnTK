var express = require('express');
var router = express.Router();

/* GET home page. */
var renderer = require('../views/renderer');
router.get('/', function(req, res, next) {
  var loginStatus = false;
  // Check login status
  if (req.session.userid != undefined) {
    // User already logged in
    loginStatus = true;
  }

  renderer.RenderIndexPage(req, res, loginStatus);
});

module.exports = router;
