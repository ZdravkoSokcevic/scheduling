const bcrypt = require('bcrypt');
const jsonwebtoken= require('jsonwebtoken');
const env = require('custom-env').env('dev');


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
            // console.log(`Sifre ${equalPass}`);
            if(equalPass) {
                // ToDo Generate JWT
                delete user.password;
                let token= this.generateJWT(user);
                response.setHeaders(res);
                res.end(JSON.stringify({token:token}));
            }else {
                response.setHeaders(res);
                res.end(JSON.stringify({message:'passwords didn\'t match'}));
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

exports.generateJWT= (user)=> {
    let jwt_secret= 'l1p511q232j5p1q114g201i3b1q6e35b4k3n602e3h3r6p3g454s1y4mh2r4q30446d4o416z6g4q694m4w3by634q3a5411p6jgf1w1i5045144';
    let signInObj= {
        id: user.id,
        username: user.username,
    }
    let secret= process.env.JWT_SECRET;
    process.env.FAKE_LOGIN=true;
    let token= jsonwebtoken.sign(signInObj,jwt_secret);
    return token;
}