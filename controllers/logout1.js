var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	
	//req.session.username = null;
	res.clearCookie('temail');
	res.redirect('/login1');
});

module.exports = router;