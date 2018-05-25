var express = require('express');
var router = express.Router();

/* GET users listing. */
var renderer = require('../views/renderer.js');
router.get('/', function(req, res, next) {
  renderer.RenderSearchResultPage(res);
});

module.exports = router;