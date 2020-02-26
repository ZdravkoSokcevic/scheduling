const env= require('custom-env').env('dev');
const jwt= require('jsonwebtoken');
const bcrypt = require('bcrypt');
const response= require('../controller/response');
const session= require('express-session');
const csurf= require('csurf');

const User= require('../model/user');
const Announcement= require('../model/announcement');

let user= {
    "id": 3,
    "first_name": "Nikola",
    "last_name": "Snjegota",
    "email": "nikolasnjegota@mail.com",
    "username": "nikola123",
    "role": "admin",
    "phone": null,
    "profile_picture": null
}

let jwt_secret= 'l1p511q232j5p1q114g201i3b1q6e35b4k3n602e3h3r6p3g454s1y4mh2r4q30446d4o416z6g4q694m4w3by634q3a5411p6jgf1w1i5045144j';
// let token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJ1c2VyMTIzNCIsImlhdCI6MTU3ODE1NDU3NH0.FDuLeqYWHFQL-W2jLt4A1cG5_w1uqO92wvZMCngUuqY";

exports.auth= (req,res)=> {
    return new Promise(resolve=> {
        user= this.getUser(req,res).then(user=> {
            let loggedIn= Object.assign({},user);
            // console.log(`Auth: ${user}`);
                resolve(loggedIn);
        }).catch(rejected=> {
            resolve(false);
        });
    })
}

exports.admin= (req,res)=> {
    return new Promise(resolve=> {
        this.auth(req,res).then(auth=> {
            if(auth==false) {
                resolve(false);
            }else {
                // console.log(`Auth ${JSON.stringify(auth)}`);
                if(auth.role=='admin') {
                    let user={};
                    resolve(auth);
                }else {
                    resolve(false);
                }
            }
        });
    })
    // return (this.auth(req,res) && this.getLoggedIn(req,res).role=='admin');
}

exports.dentist= (req,res)=> {
    return new Promise(resolve=> {
        this.auth(req,res).then(auth=> {
            if(auth==false) {
                resolve(false);
            }else {
                if(auth.role=='dentist') {
                    resolve(true);
                }else {
                    resolve(false);
                }
            }
        });
    })
    // return (this.auth(req,res) && this.getLoggedIn(req,res).role=='doctor');
}

exports.patient= (req,res)=> {
    return new Promise(resolve=> {
        this.auth(req,res).then(auth=> {
            if(auth==false) {
                resolve(false);
            }else {
                if(auth.role=='patient') {
                    resolve(true);
                }else {
                    resolve(false);
                }
            }
        });
    })
    // return this.auth(req,res) && this.getLoggedIn(req,res).role=='user';
}

exports.getLoggedIn= (req,res)=> {
    return new Promise((resolve,rejection)=> {
        if( this.auth(req,res) ) {
            this.getUser(req,res).then(user=> {
                resolve(user);
            }).catch(err=> {
                response.unauthorized(res);
            })
        }else {
            response.unauthorized(res);
        }
    })
}

exports.getUser= async(req,res)=> {
    // return new Promise((resolve,reject)=> {
    // // return user;
    //     try {
    //         let bearer= req.header('Authorization');
    //         console.log(`Bearer: ${bearer}`);
    //         let secret= process.env.JWT_SECRET;
    //         let token_data=jwt.decode(bearer);
    //         console.log(`Token parsed ${JSON.stringify(token_data)}`);
    //         User.findById(token_data.id).then(user=> {
    //             // console.log(`User ${JSON.stringify(user)}`);
    //             // console.log(`Razlicito od null ${user!==null}`);
    //             if(user!==null) {
    //                 // console.log(`User ${JSON.stringify(user)}`);
    //                 let logged= Object.assign({},user);
    //                 // console.log(`logged ${JSON.stringify(logged)}`);
    //                 resolve(logged);
    //             }else {
    //                 // response.unauthorized(res);
    //                 rejection(false);
    //             }
    //         });
    //     }catch(e) {
    //         rejection(false);
    //         console.log(`U catch ${e}`);
    //         response.unauthorized(res);
    //     }
    // });
    return new Promise(async(res,rej)=> {
        if(req.session && req.session.user !== 'undefined' && typeof req.session.user!=='undefined')
        {
            let user= await User.findById(2);
            console.log(`User: ${JSON.stringify(user)}`);
            if(user!==null)
                res(user);
            else rej(false);
        }else {
            rej(false);
        }
    });

}

exports.login= async(req,res)=> {
    let data= req.body;
    let announcements= await Announcement.all();
    if(!'email' in data || !'password' in data)
        res.redirect('/login');
    else {
        let user= await User.findOne('email', data.email);
        console.log(user);
        if(typeof user=='undefined' || !user)
            res.redirect('/login');
        else {
            let match= await bcrypt.compare(data.password, user.password);
            console.log(`Sifra tacna: ${match}`);
            if(!match) {
                req.flash('code',200);
                req.flash('message','Pogresno korisnicko ime ili lozinka');
                res.redirect('/login');
            }
            else {
                /*
                |--------------------------------------
                | Here we know that user is logged in
                | then we put creditials into session
                |--------------------------------------
                */
                let usr_obj= {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    role: user.role
                }
                // console.log(usr_obj);
                // res.locals.user= usr_obj;
                console.log(req.session);
                req.session.user= usr_obj;

                res.render('index.ejs',{user:req.session.user,announcements:announcements});
            }
        }
    }
}
