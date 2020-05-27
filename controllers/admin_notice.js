var express = require('express');
var userModel = require('./../models/user-model');
var noticeModel = require('./../models/notice_model');
var courseModel = require('./../models/student_course_model');
var router = express.Router();
router.get('*', function(request, response, next){

	if(request.cookies['username'] != null){
		next();
	}else{
		response.redirect('/logout');
	}

});

router.get('/', function(request, response){
	if(request.cookies['username'] != null){
		response.render('notice/admin_notice_index');
	}else{
		response.redirect('/logout');
	}	
});

router.post('/', function(request, response){
	
	userModel.getAll(function(result){
		if(result.length>0){
			for(var i=0; i < result.length; i++){
				//console.log(result[i].user_id);
				var notice = {
					sub : request.body.subject,
					body : request.body.noticetext,
					username : result[i].user_id
				};
				noticeModel.insert(notice, []);
			}
			response.redirect('/home');
		}
		else{
			response.send('Notice can not be send');
		}
	});
});

router.get('/teacher_view_notice/:id', function(request, response){
	var user = {
		username : request.params.id
	};
	noticeModel.getNotice(user, function(result){
		if(result.length>0){
			response.render('notice/teacher_noticeview', {notice : result});
		}
	});
});

router.get('/sendMail/:id', function(request, response){
	response.render('notice/teacher_noticesend');
});

router.post('/sendMail/:id', function(request, response){
	var notice = {
		sub : request.body.subject,
		body : request.body.noticetext,
		username : request.params.id
	};
	noticeModel.insert(notice, []);
	response.redirect('/home');
});

router.get('/sendnotice/section/:id', function(request, response){
	response.render('notice/teacher_noticesend');
});

router.post('/sendnotice/section/:id', function(request, response){
	var course = {
		name : request.params.id
	};
	courseModel.get_courseInfo(course, function(result){
		if(result.length>0){
			for(var i=0; i < result.length; i++){
				//console.log(result[i].user_id);
				var notice = {
					sub : request.body.subject,
					body : request.body.noticetext,
					username : result[i].std_username
				};
				noticeModel.insert(notice, []);
			}
			response.redirect('/home');
		}
		else{
			response.send('Notice can not be send');
		}
	});
});

module.exports = router;
