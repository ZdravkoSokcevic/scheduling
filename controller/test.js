const response= require('./response');
const User= require('../model/user');
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

exports.async= async(req,res)=> {
    let user= await User.all();
}