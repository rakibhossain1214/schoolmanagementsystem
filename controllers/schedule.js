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
		res.render('courses/schedule', {courses: result});
	});

	// console.log(req.params.id);
	// res.render('courses/index');
	

});

module.exports = router;