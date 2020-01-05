const app = require('express')();

const bodyParser = require('body-parser');

const UserRouter = require('./route/user');

const RoomRouter = require('./route/room');

const AppointmentRouter= require('./route/appointment');

const ScheduleRouter= require('./route/schedule');

const TestRouter= require('./route/test');

const env = require('custom-env').env();

const jwt= require('./helper/jwt');

jwt();

app.use(bodyParser());
// User routes
app.use('/user', UserRouter);
app.use('/room', RoomRouter);
app.use('/appointment', AppointmentRouter);
app.use('/schedule', ScheduleRouter);

app.use('/test', TestRouter);
// console.log(process.env);
app.listen(process.env.APP_PORT, process.env.APP_HOST);