var express = require('express');
var router = express.Router();

/* GET users listing. */
<<<<<<< HEAD
router.get('/', function (req, res, next) {
  var loginStatus = false;
  // Check login status
  if (req.session.userid != undefined) {
    // User already logged in
    loginStatus = true;
  }


  res.send('respond with a resource');
=======
var renderer = require('../views/renderer.js');
router.get('/', function (req, res, next) {
  renderer.RenderAccountSettingsPage(req, res);
>>>>>>> stage2-ndchuong
});

module.exports = router;
