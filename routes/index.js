var express = require('express');
var router = express.Router();

/* GET home page. */
var renderer = require('../views/renderer');
router.get('/', function(req, res, next) {
  renderer.RenderIndexPage(res);
});

module.exports = router;
