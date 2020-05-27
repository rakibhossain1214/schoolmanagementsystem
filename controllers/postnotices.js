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

var courses;
var cid;

router.get('/:id', function(req, res){

	cid = req.params.id;

	userModel.getByCourseId(cid, function(result){
		console.log("result: "+result[0]);
		courses = result;
		// res.render('courses/postnotices', {courses: result});
	});


	userModel.getByNoticeId(cid, function(result){
		console.log("result: "+result[0]);
		res.render('courses/postnotices', {notices: result, courses: courses});
	});
	

});


router.post('/:id', function(req, res){
	
	var notice = {
		notice_topic : req.body.notice_topic,
		notice_desc: req.body.notice_desc,
		cid: cid
	}

	userModel.insert_notice(notice, function(status){
		if(status){
		   // res.send(status);
		   res.redirect('/postnotices/'+cid);
	   }else{
		   res.send(status);
	   }
   });

    
});

module.exports = router;