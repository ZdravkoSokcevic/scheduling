const mysql= require('mysql');
if (process.env.NODE_ENV !== 'production') 
	require('custom-env').env('dev');

let connString={
  host: process.env.OPENSHIFT_MYSQL_DB_HOST || process.env.DB_HOST,
  user: process.env.OPENSHIFT_MYSQL_DB_USERNAME || process.env.DB_USER,
  password: process.env.OPENSHIFT_MYSQL_DB_PASSWORD || process.env.DB_PASS,
  port     : process.env.OPENSHIFT_MYSQL_DB_PORT || 3306,
  database: process.env.OPENSHIFT_APP_NAME || process.env.DB_NAME
}

let connection= mysql.createConnection(connString);

connection.connect(err=> {
  if(err) {
			console.log(err);
			throw err;
	}
  console.log("Connected to db");
});

module.exports= connection;
