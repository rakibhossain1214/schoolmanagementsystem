var express = require('express');
var db = require('./../models/db');

var router = express.Router();

router.get('/', function(request, response){
		//var obj = {};
		if(request.cookies['username'] != null){
			var user = {
				name: request.cookies['username']
			};
			var sql = "SELECT * FROM `user` WHERE `user_id` = ?";
			db.getResults(sql, [user.name], function(result){
				if(result.length > 0 ){
					//obj = {print: result};
					if(result[0].job=="admin"){
						response.render('home/adminindex', {users: result});	
					}
					else if(result[0].job=="student"){
						var ans = 0;
						var temp_c = 0;
						var temp_gpa = 0;
						var gpa = 0;
						var total_credit = 0;
						
						var sql1 = "SELECT `gpa`, `credit` FROM `student-courses` WHERE `std_username` = ?";
						db.getResults(sql1, [user.name], function(answer){
							if(answer.length>0){
								console.log(answer);
								
								for(var i=0; i < answer.length; i++){
									var temp = 0;
									temp_c = answer[i].credit;
									temp_gpa = answer[i].gpa;
									switch(temp_gpa){
										case "A+":
											temp = 4.00;
											break;
										case "A":
											temp = 3.75;
											break;
										case "B+":
											temp = 3.50;
											break;
										case "B":
											temp = 3.25;
											break;
										case "C+":
											temp = 3.00;
											break;	
										case "C":
											temp = 2.75;
											break;
										case "D+":
											temp = 2.50;
											break;
										case "D":
											temp = 2.25;
											break;
										case "F":
											temp = 0.00;
											break;
										default:
											temp = 0.00;
									}
									
									ans = temp * temp_c;
									gpa = gpa + ans;
									total_credit += temp_c; 
								}
								var tcgpa = gpa/total_credit;
								var tcost = total_credit * 5000;
								var evo = {
									cgpa : tcgpa,
									credit : total_credit,
									cost : tcost
								}
								//console.log(temp_c);	
								console.log(evo);
								response.render('home/studentindex', {users: result, evo});
							}
						});
					}
					else if(result[0].job=="teacher"){
						response.render('home/teacherindex', {users: result});	
					}
					console.log(result[0].job);
				}else{
					callback([]);
				}
			});		
		}else{
			response.redirect('/logout');
		}	
});

module.exports = router;



