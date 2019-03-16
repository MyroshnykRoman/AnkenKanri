var express = require('express');
var router = express.Router();

var ankenRouter = require('./anken/index');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use('/anken', ankenRouter);

module.exports = router;
