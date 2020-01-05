const response= require('./response');

exports.home= (req,res)=> {
    response.setHeaders(res);
    res.statusCode= 200;
    res.end(JSON.stringify({message:'tu si'}));
}


exports.loggedIn= (req,res)=> {
    response.setHeaders(res);
    res.statusCode= 200;
    console.log(res);
    res.end(JSON.stringify({message:'logged In'}));
}