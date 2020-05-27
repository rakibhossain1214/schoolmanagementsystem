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

var tid =  req.cookies['tid'];
    //console.log(tid);
    var users;
    
    var temail =  req.cookies['temail'];
		console.log(temail);
		userModel.getByEmail(temail, function(results){
					if(results.length > 0){
						console.log(results[0].tid);
						res.cookie('tid', results[0].tid);
						users = results;
					}else{
						res.redirect('/login');
					}
                });

                userModel.getMyMessages(tid, function(result){
                    res.render('dashboard/messages', {messages: result, user: users});
                    // res.send(result);
               });

            });

module.exports = router;