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
	// var user = {
	// 	name: request.cookies['tid']
	// };
	// viewModel.getby_teacher_name(user, function(results){
	// 	if(results.length>0){
	// 		response.render('user/view_student', {user: results});
	// 		//console.log(results);
	// 	}else{
	// 		response.send('invalid course format!');		
	// 	}
	// });
	//response.render('courses/view_course_index');
	
	var tid =  req.cookies['tid']
	var cid = req.params.id;

	var course_student = {
		sid: tid,
		cid: cid
	};

	userModel.insert_student(course_student, function(status){
		if(status){
		   // res.send(status);
		   res.redirect('allcourses/book');
	   }else{
		   res.send(status);
	   }
   });
	// console.log(req.params.id);
	// res.render('courses/index');
	

});

module.exports = router;