var express = require("express");
var router = express.Router();

var baoCao=require("../model/BaoCao.js");
var tuSach=require("../model/TuSach.js");
var user = require("../model/User.js");

/* GET home page. */
router.get("/", function(req, res, next) {

  res.render("index", { title: "Express" });
});

module.exports = router;
