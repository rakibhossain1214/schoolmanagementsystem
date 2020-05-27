var db = require('./db')

module.exports = {
	
	insert: function(course, callback){

		var sql ="INSERT INTO `student-courses`(`id`, `std_username`, `course_name`, `course_teacher`, `tchr_username`, `credit`, `semester`, `gpa`) VALUES ('',?,?,?,?,?,?,'')";
		db.execute(sql, [course.std_name, course.course_name, course.teacher_name, course.teacher_id, course.credit,  course.semester], function(status){
			callback(status);
		});
	},
	getby_teacher_name: function(user, callback){
		var sql = "SELECT * FROM `student-courses` WHERE `tchr_username`= ?";
		db.getResults(sql, [user.name], function(result){
			if(result.length > 0 ){
				callback(result);
			}else{
				callback([]);
			}
		});
	},
	getby_student_name: function(user, callback){
		var sql = "SELECT * FROM `student-courses` WHERE `std_username`= ?";
		db.getResults(sql, [user.name], function(result){
			if(result.length > 0 ){
				callback(result);
			}else{
				callback([]);
			}
		});
	},
	editGrade: function(course, callback){
		var sql = "UPDATE `student-courses` SET `gpa`=? WHERE `id` = ?";
		db.execute(sql, [course.gpa, course.id], function(status){
			callback(status);
		});
	}, 
	get_courseInfo : function(course, callback){
		var sql = "SELECT * FROM `student-courses` WHERE `course_name` =? ";
		db.getResults(sql, [course.name], function(result){
			if(result.length > 0 ){
				callback(result);
			}else{
				callback([]);
			}
		});
	}
}