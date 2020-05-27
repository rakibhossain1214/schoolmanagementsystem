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


router.get('/', function(req, res){

	if(req.cookies['temail'] != null){
		var temail =  req.cookies['temail'];
		console.log(temail);
		userModel.getByEmail(temail, function(results){
					if(results.length > 0){
						console.log(results[0].tid);
						res.cookie('tid', results[0].tid);
						res.render('dashboard/index',{user: results});
					}else{
						res.redirect('/login');
					}
				});
				// res.render('dashboard/index');
				
	}else{
		res.redirect('/login');
	}
	
});


router.post('/', function(req, res){

	var course ={
		cname: req.body.cname,
		cdesc: req.body.cdesc,
		start_time1: req.body.start_time1,
		end_time1: req.body.end_time1,
		start_time2: req.body.start_time2,
		end_time2: req.body.end_time2,
		con_start_time: req.body.con_start_time,
		con_end_time: req.body.con_end_time,
		tid: req.cookies['tid'],
		vlink: req.body.vlink
	};

	userModel.insert_courses(course, function(status){
	 	if(status){
			// res.send(status);
			res.redirect('/mycourses');
		}else{
			res.send(status);
		}
	});
});

module.exports = router;