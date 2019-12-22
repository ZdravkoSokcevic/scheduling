const app= require('express')();

const bodyParser= require('body-parser');

const UserRouter= require('./route/user');

const env= require('custom-env').env();

app.use(bodyParser());
// User routes
app.use('/user',UserRouter);



app.listen(process.env.APP_PORT|3000,process.env.APP_HOST);