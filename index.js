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

const env = require('custom-env').env();

const jwt= require('./helper/jwt');

const path= require('path');

jwt();

app.use(bodyParser());

app.use('/', BaseRouter);

// User routes
app.use('/user', UserRouter);
app.use('/room', RoomRouter);
app.use('/appointment', AppointmentRouter);
app.use('/announcement', AnnouncementRouter);
app.use('/schedule', ScheduleRouter);

app.use('/test', TestRouter);

app.set('view-engine','ejs');
// Access static files from public folder
app.set('views',path.join(__dirname+'/public/view/'));
app.use(express.static('public/'));
// console.log(process.env);
app.listen(process.env.APP_PORT, process.env.APP_HOST);

let color= require('cli-color');
console.log(color.red('App listen on port: ')+color.blue(process.env.APP_PORT));