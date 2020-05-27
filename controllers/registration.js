var express = require('express');
var userModel = require('./../models/user-model');
var router = express.Router();


router.get('/', function(request, response){
	if(request.cookies['username'] != null){
		response.render('registration/registration_index');
	}else{
		response.redirect('/logout');
	}	
});

router.post('/', function(request, response){
	
	var user = {
		firstName: request.body.txtFirstname, 
		lastName: request.body.txtLastname,
		username: request.body.txtusername,
		password: request.body.txtPass,
		job: request.body.jobselect,
		conPassword: request.body.txtConfirmPass,
		email: request.body.txtEmail,
		address: request.body.txtAddress
	};
	
	if(user.password==user.conPassword){
		var temp = {
			name : request.body.txtusername
		}
		userModel.getByName(temp, function(result){
			if(result.length == 0){
				userModel.insert(user, function(status){
					if(status){
						//response.cookie('username', request.body.username);
						response.redirect('/home');
					}
				});
			}
			else{
				response.send('User Already Exists!');
			}
		});
		
	}
	else{
		response.send('Password Does not Match!');		
	}

});

module.exports = router;
