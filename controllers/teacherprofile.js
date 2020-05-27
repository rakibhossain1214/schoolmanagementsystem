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

	var tid = req.params.id;
	userModel.getProfileByTeacherId(tid, function(result){
		console.log("result: "+result[0]);
		res.render('teacherprofile/index', {teacher: result});
	});
	

});

module.exports = router;