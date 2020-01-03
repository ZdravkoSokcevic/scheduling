const app = require('express')();

const bodyParser = require('body-parser');

const UserRouter = require('./route/user');

const RoomRouter = require('./route/room');

const AppointmentRouter= require('./route/appointment');

const ScheduleRouter= require('./route/schedule');
const env = require('custom-env').env();

app.use(bodyParser());
// User routes
app.use('/user', UserRouter);
app.use('/room', RoomRouter);
app.use('/appointment', AppointmentRouter);
app.use('/schedule', ScheduleRouter);


// console.log(process.env);
app.listen(process.env.APP_PORT, process.env.APP_HOST);