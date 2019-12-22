const app= require('express')();

const bodyParser= require('body-parser');

const UserRouter= require('./route/user');

const env= require('custom-env').env();

app.use(bodyParser());
// User routes
app.use('/user',UserRouter);


// console.log(process.env);
app.listen(process.env.APP_PORT,process.env.APP_HOST);