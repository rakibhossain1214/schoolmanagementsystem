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
    
var temail =  req.cookies['temail'];
	console.log(temail);
	userModel.getByEmail(temail, function(results){
			if(results.length > 0){
				console.log(results[0].tid);
                res.cookie('tid', results[0].tid);
				var balance = results[0].tbalance;
				res.cookie('balance', balance)
                res.render('dashboard/balance', {user: results});
			}else{
					res.redirect('/login');
				}
            });
            
});

router.post('/', function(req, res){
	var newBal;
	var amount = parseInt(req.body.tbalance);
	var balance = parseInt(req.cookies['balance']);
	if(balance >= amount){
		newBal = balance - amount;
		// console.log(newBal);
		// console.log(req.cookies['tid']);
		
	}else{
		res.send("Insuffeciant Balance");
	}
   
	var user = {
		tbalance : newBal,
		tid: req.cookies['tid']
	}

	userModel.update_balance(user, function(status){
	 	if(status){
			// res.send(status);
			console.log('Update Success!');
			res.redirect('/balance');
		}else{
			res.send(status);
		}
    });

    
});
            
module.exports = router;