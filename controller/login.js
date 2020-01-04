const bcrypt = require('bcrypt');
const jsonwebtoken= require('jsonwebtoken');
const user= require('../model/user');
const response= require('./response');

exports.login= (req,res)=> {
    // console.log('username' in req.body);
    this.validate(req,res);
    let username= req.body.username;
    let password= req.body.password;
    user.findOne('username',username).then(user=> {
        console.log(`user ${JSON.stringify(user)}`);
        if(user!==null && user!==[] && user!==undefined) {
            let equalPass= bcrypt.compareSync(password,user.password);
            if(equalPass) {
                console.log('to je to');
                response.setHeaders(res);
                res.end(JSON.stringify({message:'that\'s it'}));
                // ToDo Generate JWT
            }
        }else {
            response.notFound(res);
        }
    }).catch(err=> {
        response.notFound(res);
    });
}


exports.validate= (req,res)=> {
    if(!('username' in req.body) || !('password' in req.body)) {
        response.notFound(res);
    }
}