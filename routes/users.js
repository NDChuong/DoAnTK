var express = require('express');
var router = express.Router();

/* GET users listing. */
var renderer = require('../views/renderer.js');
router.get('/', function(req, res, next) {
  var loginStatus = false;
  // Check login status
  if (req.session.userid != undefined) {
    // User already logged in
    loginStatus = true;
  }

  renderer.RenderProfilePage(req, res,loginStatus);
});

module.exports = router;