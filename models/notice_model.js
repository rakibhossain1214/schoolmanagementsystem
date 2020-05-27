var db = require('./db')

module.exports = {
	
	insert: function(notice, callback){

		var sql ="INSERT INTO `user_notice`(`id`, `username`, `subject`, `notice`) VALUES ('', ?, ?, ?)";
		db.execute(sql, [notice.username, notice.sub, notice.body], function(status){
			//callback(status);
		});
	},
	getNotice: function(user, callback){
		var sql = "SELECT * FROM `user_notice` WHERE `username`=?";
		db.getResults(sql, [user.username], function(result){
			if(result.length>0){
				callback(result);
			}
			else{
				callback([]);
			}
		});
	}
}