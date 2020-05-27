var express = require('express');
var courseModel = require('./../models/courses_model');
var assignModel = require('./../models/student_course_model');
var router = express.Router();

router.get('*', function(request, response, next){

	if(request.cookies['username'] != null){
		next();
	}else{
		response.redirect('/logout');
	}

});

router.get('/', function(request, response){
	response.render('courses/assign_course_index');
});

router.post('/', function(request, response){
	var course1 = {
		name : request.body.coursename1
	};
	var course2 = {
		name : request.body.coursename2
	};
	var course3 = {
		name : request.body.coursename3
	};
	var user = {
		name : request.body.txtname,
		t_semester: request.body.select_semester
	};
	if(course1.name){
		courseModel.get_course_byname(course1, function(result){
			if(result.length>0){
				var values = {
					std_name : user.name,
					course_name : course1.name,
					teacher_name : result[0].teacher_name,
					teacher_id : result[0].teacher_id,
					credit : result[0].credit,
					semester: user.t_semester
					
				}
				console.log(values);
				assignModel.insert(values, function(status){
					if(status){
					}else{
						response.send('invalid assign format!');		
					}
				});
			}
		});
	}
	if(course2.name){
		courseModel.get_course_byname(course2, function(result){
			if(result.length>0){
				var values = {
					std_name : user.name,
					course_name : course2.name,
					teacher_name : result[0].teacher_name,
					teacher_id : result[0].teacher_id,
					credit : result[0].credit,
					semester: user.t_semester
					
				}
				console.log(values);
				assignModel.insert(values, function(status){
					if(status){
					}else{
						response.send('invalid assign format!');		
					}
				});
			}
		});
	}
	if(course3.name){
		courseModel.get_course_byname(course3, function(result){
			if(result.length>0){
				var values = {
					std_name : user.name,
					course_name : course3.name,
					teacher_name : result[0].teacher_name,
					teacher_id : result[0].teacher_id,
					credit : result[0].credit,
					semester: user.t_semester
					
				}
				console.log(values);
				assignModel.insert(values, function(status){
					if(status){
					}else{
						response.send('invalid assign format!');		
					}
				});
			}
		});
	}
	response.redirect('/home');
						
});


module.exports = router;