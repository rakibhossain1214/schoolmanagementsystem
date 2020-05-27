var express = require('express');
var userModel = require('./../models/user-model');
var router = express.Router();

router.get('*', function(request, response, next){

	if(request.cookies['username'] != null){
		next();
	}else{
		response.redirect('/logout');
	}

});

router.get('/details', function(request, response){
	userModel.getAll(function(results){
		if(results.length>0){
			response.render('user/detial_index', {user: results});
			//console.log(results);
		}else{
			response.send('invalid user format!');		
		}
	});
	
	//console.log("Details get");
	//response.render('courses/view_course_index');
});

router.get('/deleteuser/:id', function(request, response){
	var user = {
		id : request.params.id
	};
	response.render('user/delete_index', {user});
});

router.post('/deleteuser/:id', function(request, response){
	var user = {
		id : request.params.id
	};
	userModel.deleteUser(user, function(status){
		if(status){
			response.redirect('/home');
			//console.log(results);
		}else{
			response.send('invalid Delete format!');		
		}
	});
	
	//console.log("Details get");
	//response.render('courses/view_course_index');
});

router.get('/edituser/:user_id', function(request, response){
	var user = {
		name: request.params.user_id
	};
	//console.log(user.name);
	userModel.getByName(user, function(results){
		if(results.length>0){
			response.render('user/edit_index', {user: results});
			//console.log(results);
		}else{
			response.send('invalid edit format!');		
		}
	});
});

router.post('/edituser/:user_id', function(request, response){
	var user = {
		firstName: request.body.txtfrist_name, 
		lastName: request.body.txtlast_name,
		username: request.body.txtuserid,
		email: request.body.txtEmail,
		address: request.body.txtaddress
	};
	//console.log(user.name);
	//console.log(user)
	userModel.update(user, function(status){
		if(status){
			response.redirect('/home');
			//console.log("Update Done");
		}else{
			response.send('invalid edit format!');		
		}
	});
});
module.exports = router;