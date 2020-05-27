var express = require('express');
var viewModel = require('./../models/student_course_model');
var router = express.Router();

router.get('*', function(request, response, next){

	if(request.cookies['username'] != null){
		next();
	}else{
		response.redirect('/logout');
	}

});

router.get('/', function(request, response){
	var user = {
		name: request.cookies['username']
	};
	viewModel.getby_teacher_name(user, function(results){
		if(results.length>0){
			response.render('user/view_student', {user: results});
			//console.log(results);
		}else{
			response.send('invalid course format!');		
		}
	});
	//response.render('courses/view_course_index');
});

router.get('/editgrade/:id', function(request, response){
	response.render('courses/edit_grade');
});

router.post('/editgrade/:id', function(request, response){
	var course ={
		id : request.params.id,
		gpa : request.body.grade
	};
	viewModel.editGrade(course, function(status){
		if(status){
			response.redirect('/home');
		}
		else{
			response.send("Invalid Edit Grade!");
		}
	});
});

router.get('/showstudentcourses/:user_id',function(request, response){
	var user = {
		name : request.params.user_id
	};
	viewModel.getby_student_name(user, function(results){
		if(results.length>0){
			response.render('courses/show_student_courses', {user : results});
		}
		else{
			response.send('Invalid Student Courses');
		}
	});
});
module.exports = router;