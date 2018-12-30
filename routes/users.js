var express = require('express');
var router = express.Router();
var db = require('./database');
var result = '';
/* GET users listing. */
router.get('/logout', function(req, res, next) {
	res.clearCookie("isLogin");
	return	res.redirect('/');
});

router.post('/sineup', function(req, res, next) {
	let response = {'code':101,'message':"Not able to sine in"} ;
	let params = [req.body.name,req.body.email,req.body.password,req.body.role];
	
	db.connect().then(con =>{
		sql = "Select email from sine_up where email="+"'"+req.body.email+"'" ;
		let getVal = [];
		db.query(con,sql,[getVal]).then(result => {
			if(result.length > 0){
				response.code = "101";
				response.message = "Email id already registred";
				res.send(response);
			}else{
				db.connect().then(con =>{
					sql = "INSERT INTO sine_up (username,email,password,role) VALUES (?)" ;
					db.query(con,sql,[params]).then(result => {
						response.code = "103";
						response.message = "Successfully Registered";
						res.send(response);
					},err => {
						response.code = "101";
						response.message = "Not Registered";
						res.send(response);
					});
				},err =>{
					response.message = "DB Connection Failure";
					res.send(response);
				});
			}
		},err =>{
			response.message = "Execution Failure";
			res.send(response);
		});
	},err =>{
		// res.send("DB Connection Failure");
		response.message = "DB Connection Failure";
		res.send(response);
	})
	
});

router.post('/sinein',function(req,res, next){
	let response = {'code':101,'message':"Login Failure"} ;
	db.connect().then(result => {
		let email = req.body.email;
		let pass = req.body.password;
		let params = [];
		sql = "Select email,password from sine_up where email="+"'"+email+"'"+" and password="+"'"+pass+"'" ;
		db.query(result,sql,params).then(result => {
			if(result.length > 0){
				res.cookie('isLogin',"1");
				response.code = "103";
				response.message = "Successfully sine in";	
			}else{
				response.code = "101";
				response.message = "username or password not valid.";	
			}
			res.send(response);
		},err => {
			response.code = "101";
			response.message = "Query Execution Failure.";
			res.send(response);
		})
	},err =>{
		response.message = "DB Connection Failure";
		res.send(response);
	});
});
module.exports = router;
