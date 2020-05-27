var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');

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
						res.render('home1/index', {teacher: results});
					}else{
						res.redirect('/login');
					}
				});
				// res.render('dashboard/index');
				
	}else{
		res.redirect('/login');
	}
});



module.exports = router;