var express = require('express');
var router = express.Router();

/* GET users listing. */
var renderer = require('../views/renderer.js');

router.post('/', function (req, res, next) {
  var loginStatus = false;
  // Check login status
  if (req.session.userid != undefined) {
    // User already logged in
    loginStatus = true;
  }
  var keyword = req.body.keyword;
  
  if (keyword != undefined) {
    renderer.RenderSearchResultPage(req, res, loginStatus, keyword);
  }
});

router.get('/', function(req, res, next) {
  var loginStatus = false;
  // Check login status
  if (req.session.userid != undefined) {
    // User already logged in
    loginStatus = true;
  }

  renderer.RenderSearchResultPage(req, res, loginStatus);
});

module.exports = router;
