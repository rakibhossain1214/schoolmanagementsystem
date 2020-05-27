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
	var sid;
	var cid = req.params.id;
	userModel.getByCourseId(cid, function(result){
		console.log("result: "+result[0]);
		courses = result;
		// res.render('courses/mystudents', {courses: result});
	});

	userModel.getStudentIdByCourseId(cid, function(result){
		console.log("SID: "+result[0]);
		sid = result[0].sid;
		// res.render('courses/mystudents', {courses: courses, sid: result[0]});
	});

	userModel.getProfileByTeacherId(2, function(result){

		res.render('courses/mystudents', {courses: courses, sid: sid, students: result});
		console.log("Total Result: "+result[0]);
	});
	
	

});

module.exports = router;