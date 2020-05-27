var express = require('express');
var userModel = require.main.require('./models/user-model');
var router = express.Router();


router.get('*', function(request, response, next){

	if(request.cookies['temail'] != null){
		next();
	}else{
		response.redirect('/logout');
	}

});


router.get('/:id', function(req, res){

	var courses;
	var cid = req.params.id;
	userModel.getByCourseId(cid, function(result){
		console.log("result: "+result[0]);
		courses = result;
		// res.render('courses/shortnotes', {courses: result});
	});

	userModel.getByNotificationId(cid, function(result){
		console.log("result: "+result[0]);
		res.render('courses/notifications', {notifications: result, courses: courses});
	});

	// console.log(req.params.id);
	// res.render('courses/index');
	

});

module.exports = router;