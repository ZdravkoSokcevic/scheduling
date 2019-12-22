const router= require('express').Router();
const bcrypt= require('bcrypt');
let conn= require('../model/database');
const UserController= require('../controller/user');

router.get('/',(req,res)=> {
  res.end('/user si dosao');
});


router.post('/insert',(req,res)=> {
  conn.connect(err=> {
    if(err) {
      throw err;
    } else {
      let data= req.body;
      let query= "INSERT INTO users (first_name,last_name,username,email,password,role,access_token,remember_token,profile_picture) VALUES (?,?,?,?,?,?,?,?,?)";
      let password= bcrypt.hash(data.password,5,(err,pwwd)=> {
        conn.query(query,[data.first_name,data.last_name,data.username,data.email,pwwd,'user',null,null,null],(err,record,info)=> {
          if(err) throw err;
          else {
            res.statusCode=200;
            res.end('success');
          }
        });
      });
    }
  });
});

router.get('/all',UserController.allUsers);


module.exports= router;