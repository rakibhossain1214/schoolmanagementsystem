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

router.get('/teacher', function(request, response){
	var user = {
		name: request.cookies['username']
	};
	courseModel.view_course(user, function(results){
		if(results.length>0){
			response.render('courses/view_course_index', {course: results});
			//console.log(results);
		}else{
			response.send('invalid course format!');		
		}
	});
	//response.render('courses/view_course_index');
});
router.get('/admin', function(request, response){
	courseModel.view_all_course(function(results){
		if(results.length>0){
			response.render('courses/view_course_index', {course: results});
			//console.log(results);
		}else{
			response.send('invalid course format!');		
		}
	});
	//response.render('courses/view_course_index');
});

/* router.post('/', function(request, response){
	
	var course = {
		course_name: request.body.course_name,
		credit: request.body.credit,
		teacher_id: request.body.teacher_id,
		teacher_name: request.body.teacher_name
	};

	courseModel.insert(course, function(status){
		if(status){
			response.redirect('/home');
		}else{
			response.send('invalid course format!');		
		}
	});

}); */

module.exports = router;
