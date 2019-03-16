var express = require('express');
var router = express.Router();

var addRoute = require('./add')
var deleteRoute = require('./delete')
var getRoute = require('./get')
var searchRoute = require('./search')
var updateRoute = require('./update')

router.post('/add', addRoute);
router.post('/delete', deleteRoute);
router.get('/get', getRoute);
router.post('/search', searchRoute);
router.post('/update', updateRoute);

module.exports = router;
