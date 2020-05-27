var express = require('express');
var courseModel = require('./../models/courses_model');
var router = express.Router();
router.get('*', function(request, response, next){

	if(request.cookies['username'] != null){
		next();
	}else{
		response.redirect('/logout');
	}

});
router.get('/', function(request, response){
	response.render('courses/add_course_index');
});

router.post('/', function(request, response){
	
	var course = {
		cname: request.body.cname,
		tid: request.body.tid,
		cdesc: request.body.cdesc,
		start_time1: request.body.start_time1,
		end_time1: request.body.end_time1,
	};

	courseModel.insert(course, function(status){
		if(status){
			response.redirect('/home');
		}else{
			response.send('invalid course format!');		
		}
	});

});

module.exports = router;
