var db = require('./db');

module.exports= {
	getById : function(id, callback){
		var sql = "select * from user where id="+id;
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
    },
    getByName: function(user, callback){
		var sql = "SELECT * FROM `user` WHERE `user_id` = ?";
			db.getResults(sql, [user.name], function(result){
				if(result.length > 0 ){
					callback(result);
				}else{
					callback([]);
				}
			});
	},
	getAll_courses : function(callback){
		var sql = "select * from courses";
		db.getAllResults(sql, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
    },
    getAll: function(callback){
		var sql = "select * from user";
		
		db.getResults(sql, [], function(results){
			
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});	
	},
	getAllfromTeacher : function(callback){
		var sql = "select * from teachers";
		db.getAllResults(sql, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	validate_teacher: function(user, callback){
        var sql = "SELECT * from teachers where temail=? and tpassword=?";
        db.getResults(sql, [user.temail, user.tpassword], function(results){
            if(results.length > 0){
                callback(true);
            }else{
                callback(false);
            }
        })
    },
    validate: function(user, callback){
		var sql ="select * from user where user_id=? and password=?";
		db.getResults(sql, [user.username, user.password], function(result){

			if(result.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});	
	},
	update_balance: function(user, callback){
        var sql = " UPDATE teachers SET tbalance=? WHERE tid=?";
        db.execute(sql, [user.tbalance, user.tid], function(status){
            if(status){
                callback(true);
            }else{
                callback(false);
            }
		})
	} ,
	update_teacher_profile: function(user, callback){
        var sql = " UPDATE teachers SET tname=?, temail=?, tmobile=?, tpassword=? WHERE tid=?";
        db.execute(sql, [user.tname, user.temail, user.tmobile, user.tpassword, user.tid], function(status){
            if(status){
                callback(true);
            }else{
                callback(false);
            }
		})
    } ,
    update_course_info: function(course, callback){
        var sql = " UPDATE courses SET cname=?, cdesc=?, start_time1=?, end_time1=?, start_time2=?, end_time2=?, con_start_time=?, con_end_time=?, vlink=? WHERE cid=?";
        db.execute(sql, [course.cname, course.cdesc, course.start_time1, course.end_time1, course.start_time2, course.end_time2, course.con_start_time, course.con_end_time, course.vlink, course.cid ], function(status){
            if(status){
                callback(true);
            }else{
                callback(false);
            }
		})
	} ,
	insert_courses: function(course, callback){
        var sql = "insert into courses(cname, cdesc, start_time1, start_time2, end_time1, end_time2, con_start_time, con_end_time, tid, vlink) values(?,?,?,?,?,?,?,?,?,?)";
        db.execute(sql, [course.cname, course.cdesc, course.start_time1, course.start_time2, course.end_time1, course.end_time2, course.con_start_time, course.con_end_time, course.tid, course.vlink], function(status){
            if(status){
                callback(true);
            }else{
                callback(false);
            }
		})
	} ,
	insert_consulting_hours: function(course, callback){
        var sql = "insert into conhours(start_time, end_time, tid) values(?,?,?)";
        db.execute(sql, [course.start_time, course.start_time, course.tid], function(status){
            if(status){
                callback(true);
            }else{
                callback(false);
            }
		})
	} ,
	insert_teacher: function(user, callback){
        var sql = "insert into teachers(tname, temail, tmobile, tpassword) values(?,?,?,?)";
        db.execute(sql, [user.tname, user.temail, user.tmobile, user.tpassword], function(status){
            if(status){
                callback(true);
            }else{
                callback(false);
            }
		})
    } ,
    insert_notice: function(notice, callback){
        var sql = "insert into notices(notice_topic, notice_desc, cid) values(?,?,?)";
        db.execute(sql, [notice.notice_topic, notice.notice_desc, notice.cid], function(status){
            if(status){
                callback(true);
            }else{
                callback(false);
            }
		})
    } ,
    insert_notes: function(notes, callback){
        var sql = "insert into notes(note_topic, note_desc, cid) values(?,?,?)";
        db.execute(sql, [notes.note_topic, notes.note_desc, notes.cid], function(status){
            if(status){
                callback(true);
            }else{
                callback(false);
            }
		})
    } ,
	getByEmail : function(temail, callback){
		var sql = "select * from teachers where temail='"+temail+"'";
		console.log("Email: "+temail);
		db.getTeacherResults(sql, function(results){
            if(results.length > 0){
                callback(results);
            }else{
                callback([]);
            }
        })
	},
	getByTeacherId : function(tid, callback){
		var sql = "select * from courses where tid='"+tid+"'";
		console.log("Tid: "+tid);
		db.getTeacherResults(sql, function(results){
            if(results.length > 0){
                callback(results);
            }else{
                callback([]);
            }
        })
	},
	getProfileByTeacherId : function(tid, callback){
		var sql = "select * from teachers where tid='"+tid+"'";
		console.log("Tid: "+tid);
		db.getTeacherResults(sql, function(results){
            if(results.length > 0){
                callback(results);
            }else{
                callback([]);
            }
        })
	},
	getStudentIdByCourseId : function(cid, callback){
		var sql = "select sid from course_student where cid='"+cid+"'";
		console.log("Cid: "+cid);
		db.getTeacherResults(sql, function(results){
            if(results.length > 0){
                callback(results);
            }else{
                callback([]);
            }
        })
	},
	getByCourseId : function(cid, callback){
		var sql = "select * from courses where cid='"+cid+"'";
		console.log("Cid: "+cid);
		db.getTeacherResults(sql, function(results){
            if(results.length > 0){
                callback(results);
            }else{
                callback([]);
            }
        })
    },
    getByNoticeId : function(cid, callback){
		var sql = "select * from notices where cid='"+cid+"'";
		console.log("Cid: "+cid);
		db.getTeacherResults(sql, function(results){
            if(results.length > 0){
                callback(results);
            }else{
                callback([]);
            }
        })
    },
    getByNotificationId : function(cid, callback){
		var sql = "select * from notifications where cid='"+cid+"'";
		console.log("Cid: "+cid);
		db.getTeacherResults(sql, function(results){
            if(results.length > 0){
                callback(results);
            }else{
                callback([]);
            }
        })
    },
    getByNoteId : function(cid, callback){
		var sql = "select * from notes where cid='"+cid+"'";
		console.log("Cid: "+cid);
		db.getTeacherResults(sql, function(results){
            if(results.length > 0){
                callback(results);
            }else{
                callback([]);
            }
        })
	},
	getMyMessages : function(tid, callback){
		var sql = "select * from tmessages where uid2='"+tid+"'";
		console.log("Tid: "+tid);
		db.getTeacherResults(sql, function(results){
            if(results.length > 0){
                callback(results);
            }else{
                callback([]);
            }
        })
    },
    update: function(user, callback){
		var sql ="UPDATE `user` SET `first_name`=?,`last_name`=? ,`address`=? ,`email`=?  WHERE `user_id`= ?";
	
		db.execute(sql, [user.firstName, user.lastName, user.address, user.email, user.username], function(status){
			callback(status);
		});
    },
    deleteUser: function(user, callback){
		var sql = "DELETE FROM `user` WHERE `user_id` = ?";
		db.execute(sql, [user.id], function(status){
			callback(status);
		});
    },
    insert: function(user, callback){
		var sql ="insert into user values('', ?, ?, ?, ?, ?, ?, ?)";
		db.execute(sql, [user.firstName, user.lastName, user.username, user.address, user.email, user.password, user.job], function(status){
			callback(status);
		});
    },
    insert_student: function(student, callback){
        var sql = "insert into course_student(cid, sid) values(?,?)";
        db.execute(sql, [student.cid, student.sid], function(status){
            if(status){
                callback(true);
            }else{
                callback(false);
            }
		})
    } ,
}