var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var contactdb = require('../models/contact');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('contact');
});

router.post('/', function (req, res) {
	contactdb.create(req.body).then(function (contactdb) {
		res.send(contactdb)
	});
});

module.exports = router;
