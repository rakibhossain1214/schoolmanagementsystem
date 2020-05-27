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

	var cid = req.params.id;
	userModel.getByCourseId(cid, function(result){
		console.log("result: "+result[0]);
		res.render('courses/updatemycourse', {courses: result});
	});

	// console.log(req.params.id);
	// res.render('courses/index');

});


router.post('/:id', function(req, res){
    
	var course ={
		cname: req.body.cname,
		cdesc: req.body.cdesc,
		start_time1: req.body.start_time1,
		end_time1: req.body.end_time1,
		start_time2: req.body.start_time2,
		end_time2: req.body.end_time2,
		con_start_time: req.body.con_start_time,
		con_end_time: req.body.con_end_time,
		vlink: req.body.vlink,
		cid: req.params.id
	};

	userModel.update_course_info(course, function(status){
	 	if(status){
			// res.send(status);
			console.log('Update Success!');
			res.redirect('/updatemycourse/'+ req.params.id);
		}else{
			res.send(status);
		}
    });

    
});

module.exports = router;