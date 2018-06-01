var express = require('express');
var router = express.Router();

/* GET home page. */
var renderer = require('../views/renderer.js');
router.get('/', function(req, res, next) {
  renderer.RenderIndexPage(req, res);
});

module.exports = router;
