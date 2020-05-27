//declaration
var express = require('express');
var login1 = require('./controllers/login1');
var home1 = require('./controllers/home1');
var landing = require('./controllers/landing');
var logout1 = require('./controllers/logout1');
var dashboard = require('./controllers/dashboard');
var mycourses = require('./controllers/mycourses');
var tregister = require('./controllers/tregister');
var messages = require('./controllers/messages');
var balance = require('./controllers/balance');
var courses = require('./controllers/courses');
var schedule = require('./controllers/schedule');
var shortnotes = require('./controllers/shortnotes');
var mystudents = require('./controllers/mystudents');
var mymessages = require('./controllers/mymessages');
var notifications = require('./controllers/notifications');
var postnotices = require('./controllers/postnotices');
var videocall = require('./controllers/videocall');
var updatemycourse = require('./controllers/updatemycourse');
var teacherprofile = require('./controllers/teacherprofile');
var profileupdate = require('./controllers/profileupdate');
var allcourses = require('./controllers/allcourses');


//admin
var login = require('./controllers/login');
var registration = require('./controllers/registration');
var home = require('./controllers/home');
var user = require('./controllers/user');
var logout = require('./controllers/logout');
var add_courses = require('./controllers/add_courses');
var view_courses = require('./controllers/view_courses');
var assign_courses = require('./controllers/assign_courses');
var student_view = require('./controllers/view_student');
var admin_notice = require('./controllers/admin_notice');
var apply = require('./controllers/apply');
var book = require('./controllers/book');


var exSession = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

//configuration
app.set('view engine', 'ejs');

//middleware 
app.use(bodyParser.urlencoded({extended:true}));
app.use(exSession({secret: 'my top secret value', saveUninitialized: true, resave: false}));
app.use(cookieParser());

app.use('/login1', login1);
app.use('/home1', home1);
app.use('/landing', landing);
app.use('/logout1', logout1);
app.use('/dashboard', dashboard);
app.use('/mycourses', mycourses);
app.use('/tregister', tregister);
app.use('/messages', messages);
app.use('/balance', balance);
app.use('/courses', courses);
app.use('/schedule', schedule);
app.use('/shortnotes', shortnotes);
app.use('/mystudents', mystudents);
app.use('/mymessages', mymessages);
app.use('/notifications', notifications);
app.use('/postnotices', postnotices);
app.use('/videocall', videocall);
app.use('/updatemycourse', updatemycourse);
app.use('/teacherprofile', teacherprofile);
app.use('/profileupdate', profileupdate);
app.use('/allcourses', allcourses);
app.use('/apply', apply);
app.use('/book', book);


//admin
app.use('/login', login);
app.use('/registration', registration);
app.use('/home', home);
 app.use('/user', user);
app.use('/logout', logout);
app.use('/addcourses', add_courses);
app.use('/viewcourses', view_courses);
app.use('/assigncourses', assign_courses);
app.use('/viewstudent', student_view);
app.use('/adminnotice', admin_notice);
app.use('/book', book);

//routes
app.get('/', function(req, res){
	res.redirect('landing');
});

//server startup
app.listen(3000, function(){
	console.log('node server started at 3000!');
});