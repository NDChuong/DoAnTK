var express = require('express');
var router = express.Router();
var lib = require('../controller/lib');


router.get('/', function (req, res, next) {
  req.session.destroy(function(err) {
    console.log('Logout successfully');
  })

  res.redirect(req.get('referer'));
});

router.post('/', function(req, res, next){
  req.session.isLogged= false;
  req.session.userid = null;

  res.redirect('/');
});
module.exports = router;
