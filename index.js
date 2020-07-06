const express= require('express');
const app = express();

const bodyParser = require('body-parser');

const BaseRouter= require('./route/base');

const UserRouter = require('./route/user');

const RoomRouter = require('./route/room');

const AppointmentRouter= require('./route/appointment');

const ScheduleRouter= require('./route/schedule');

const TestRouter= require('./route/test');

const AnnouncementRouter= require('./route/announcement');

if (process.env.NODE_ENV !== 'production') 
	require('dotenv').config();

const jwt= require('./helper/jwt');

const path= require('path');

const session= require('express-session');

const cookieParser= require('cookie-parser');

const flash= require('express-flash');

const SessionMiddleware= require('./middleware/session');

const GlobalMiddleware = require('./middleware/global');

jwt();

app.use(bodyParser());

/*
|
|	SERVING STATIC FILES FROM PUBLIC
|
*/
app.use(express.static('public/'));


let sesss={
	cookie:{},
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false },
	genid: function(req) {
		return '213';
	}
}

let sess= session(sesss);

app.use(cookieParser());
app.use(sess);
app.use(flash());

app.use('/', GlobalMiddleware);

app.use('/', BaseRouter);
app.get('/', SessionMiddleware);
// User routes
app.use('/user', UserRouter);
app.use('/room', RoomRouter);
app.use('/appointment', AppointmentRouter);
app.use('/announcement', AnnouncementRouter);
app.use('/schedule', ScheduleRouter);

app.use('/test', TestRouter);

app.set('view-engine','ejs');
// Access static files from public folder
let viewsPath = [
	path.join(__dirname + '/public/view'),
	path.join(__dirname + '/public/view/room'),
	path.join(__dirname + '/public/view/partials')
];
app.set('views',viewsPath);

console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV == 'production') {
	app.listen(process.env.PORT || 8000);
}else {
	app.listen(process.env.PORT || 8000, process.env.APP_HOST || '');
}

let color= require('cli-color');
console.log(color.red('App listen on port: ')+color.blue(process.env.PORT));
