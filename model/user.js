const conn= require('../model/database');

let UserModel= {
  all:()=> {
    return new Promise((res,rej)=> {
      conn.connect(err=> {
        if(err) throw err;
        else {
          let query= "SELECT * FROM users";
          conn.query(query,(err,results)=> {
            if(err) throw err;
            else res(results);
          });
        }
      });
    });
  }
}


module.exports= UserModel;