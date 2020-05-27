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
		res.render('teacherprofile/profileupdate', {teacher: result});
	});

});


router.post('/:id', function(req, res){
    
	var user = {
        tid: req.params.id,
		tname : req.body.tname,
        temail : req.body.temail,
        tmobile : req.body.tmobile,
        tpassword : req.body.tpassword
	}

	userModel.update_teacher_profile(user, function(status){
	 	if(status){
			// res.send(status);
			console.log('Update Success!');
			res.redirect('/teacherprofile/'+user.tid);
		}else{
			res.send(status);
		}
    });

    
});

module.exports = router;