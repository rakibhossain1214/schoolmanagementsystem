var express = require('express');
var userModel = require.main.require('./models/user-model');
var router = express.Router();


router.get('/', function(req, res){
	res.render('tregister/index');
});


router.post('/', function(req, res){

	var user ={
		tname: req.body.tname,
		temail: req.body.temail,
		tmobile: req.body.tmobile,
		tpassword: req.body.tpassword

	};

	userModel.insert_teacher(user, function(status){
	 	if(status){
			res.cookie('temail', req.body.temail);
			res.redirect('/home');
		}else{
			res.send(status);
		}
	});
});
module.exports = router;