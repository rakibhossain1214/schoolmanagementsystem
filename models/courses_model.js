var db = require('./db')

module.exports = {
	
	insert: function(course, callback){

		var sql ="insert into courses(cname, cdesc, tid, start_time1, end_time1) values(?, ?, ?, ?, ?)";
		db.execute(sql, [course.cname, course.cdesc, course.tid, course.start_time1, course.end_time1], function(status){
			callback(status);
		});
	},
	
	view_course: function(user, callback){
		var sql = " SELECT * FROM `courses` WHERE `teacher_id` = ?";
		db.getResults(sql, [user.name], function(result){
				if(result.length > 0 ){
					callback(result);
				}else{
					callback([]);
				}
			});
	},
	view_all_course: function(callback){
		var sql = " SELECT * FROM `courses`";
		db.getResults(sql, [], function(result){
				if(result.length > 0 ){
					callback(result);
				}else{
					callback([]);
				}
			});
	},
	get_course_byname: function(course, callback){
		var sql = "SELECT * FROM `courses` WHERE `course_name` = ?";
		db.getResults(sql, [course.name], function(result){
			if(result.length > 0 ){
				callback(result);
			}else{
				callback([]);
			}
		});
	}
}