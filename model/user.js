const conn= require('../model/database');
const bcrypt= require('bcrypt');

let UserModel= {
  all:()=> {
    return new Promise((res,rej)=> {
          let query= "SELECT * FROM users";
          let connection=conn.query(query,(err,results)=> {
            if(err) throw err;
            else {
              res(results);
            }
          });
    });
  },
  insert:(data)=> {
    return new Promise((res,rej)=> {
      let query= "INSERT INTO users (first_name,last_name,username,email,password,role,access_token,remember_token,profile_picture) VALUES (?,?,?,?,?,?,?,?,?)";
      let password= bcrypt.hash(data.password,5,(err,pwwd)=> {
        conn.query(query,[data.first_name,data.last_name,data.username,data.email,pwwd,'user',null,null,null],(err,record,info)=> {
          if(err) {
            throw err;
            res(false);
          }else {
            res(true);
          }
        });
    });
    });
  }
}
module.exports= UserModel;