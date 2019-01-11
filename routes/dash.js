var express = require('express');
var router = express.Router();
var db = require('./database');
var result = '';
/* GET home page. */
router.get('/dashboard', function(req, res, next) {
	res.render('dash/dashboard');
});
router.get('/user', function(req, res, next) {
	let loginUserID = req.cookies.isLogin;
	loginUserID = loginUserID.split("_")[2];
	db.connect().then(con =>{
		sql = "Select * from sine_up where id="+loginUserID;
		let getVal = [];
		db.query(con,sql,[getVal]).then(result => {
			if(result.length > 0){
				console.log(result);
				//result = JSON.parse(JSON.stringify(result));
				// data = {'ad':JSON.stringify(result)};
				res.render('dash/user',{data:JSON.stringify(result[0])});
			}
			return false;
		}),err =>{

		}
	}),err =>{
		// res.send("DB Connection Failure");
		response.message = "DB Connection Failure";
		res.send(response);
	};
	console.log("==2");
	
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
