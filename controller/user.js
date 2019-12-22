// const conn= require('../model/database');
const UserModel= require('../model/user');


exports.allUsers= (req,res)=> {
  UserModel.all().then(result=> {
    res.statusCode=200;
    result.forEach(element => {
      delete element.password;
      delete element.access_token;
      delete element.remember_token;
    });
    res.end(JSON.stringify(result));
  });
}

exports.insert= (req,res)=> {
  let data= req.body;
  UserModel.insert(data).then(response=> {
    if(!response) {
      res.statusCode=404;
      res.end(JSON.stringify('Error'));
    }else {
      res.statusCode=200;
      res.end(JSON.stringify({message:'success'}));
    }
  });
}

// module.exports= UserController;