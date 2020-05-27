var express = require('express');
var userModel = require.main.require('./models/user-model');
var router = express.Router();

router.get('/', function(req, res){
	res.render('login1/index');
});

router.post('/', function(req, res){

	var user ={
		temail: req.body.temail,
		tpassword: req.body.tpassword
	};

	userModel.validate_teacher(user, function(status){
	 	if(status){
			res.cookie('temail', req.body.temail);
			res.redirect('/home1');
		}else{
			res.send('invalid email/password');
		}
	});
});

module.exports = router;