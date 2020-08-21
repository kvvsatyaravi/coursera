var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.statusCode = 200;
  res.end('Express');
  res.end('welcome to express homepage');
});

module.exports = router;