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


var cid;

router.get('/:id', function(req, res){
var courses;
	cid = req.params.id;
	userModel.getByCourseId(cid, function(result){
		// console.log("result: "+result[0]);
		courses = result;
		// res.render('courses/shortnotes', {courses: result});
	});

	// console.log(req.params.id);
	// res.render('courses/index');
	
	userModel.getByNoteId(cid, function(result){
		// console.log("result: "+result[0]);
		res.render('courses/shortnotes', {notes: result, courses: courses});
	});

});


router.post('/:id', function(req, res){
	
	var notes = {
		note_topic : req.body.note_topic,
		note_desc: req.body.note_desc,
		cid: cid
	}

	userModel.insert_notes(notes, function(status){
		if(status){
		   // res.send(status);
		   console.log('Update Success!');
		   res.redirect('/shortnotes/'+notes.cid);
	   }else{
		   res.send(status);
	   }
   });

    
});
module.exports = router;