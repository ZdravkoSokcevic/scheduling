const response= require('./response');
const User= require('../model/user');
const logger = require('../helper/log');
const auth = require('../controller/auth');

exports.home= (req,res)=> {
    response.setHeaders(res);
    res.statusCode= 200;
    res.end(JSON.stringify({message:'tu si'}));
}


exports.loggedIn= (req,res)=> {
    response.setHeaders(res);
    res.statusCode= 200;
    res.end(JSON.stringify({message:'logged In'}));
}

exports.testLog = async(req,res) => {
	let user = await auth.getUser(req,res);
	logger.log(user);
	res.end(JSON.stringify(user));
}

exports.async= async(req,res)=> {
    let user= await User.all();
}