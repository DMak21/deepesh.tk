var express = require('express');
var router = express.Router();
var blogdb = require('../models/blog');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.render('blog');
});

router.get('/:id', function(req, res, next) {
	var blogid = req.param('id')
	res.render('posts/' + blogid);
});

module.exports = router;
