var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/dashboard', function(req, res, next) {
	res.render('dash/dashboard');
});
router.get('/user', function(req, res, next) {
	res.render('dash/user');
});
router.get('/icons', function(req, res, next) {
	res.render('dash/icons');
});
router.get('/maps', function(req, res, next) {
	res.render('dash/maps');
});
router.get('/notifications', function(req, res, next) {
	res.render('dash/notifications');
});
router.get('/table', function(req, res, next) {
	res.render('dash/table');
});
router.get('/typography', function(req, res, next) {
	res.render('dash/typography');
});
router.get('/upgrade', function(req, res, next) {
	res.render('dash/upgrade');
});
module.exports = router;
