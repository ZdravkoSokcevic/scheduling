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

exports.update= (req,res)=> {
  let data= req.body;
  UserModel.update(data).then(response=> {
    if(!response) {
      res.statusCode= 404;
      res.end(JSON.stringify({message:'not found'}));
    }else {
      res.statusCode= 200;
      res.end(JSON.stringify({message:'success'}));
    }
  });
}

exports.delete= (req,res)=> {
  id= req.params.id;
  UserModel.findById(id).then(result=> {
    if(result==null) {
      res.statusCode= 404;
      res.end(JSON.stringify('Not found'));
    }else {
      UserModel.delete(id).then(success=> {
        if(!success) {
			res.statusCode= 404;
			res.end(JSON.stringify({message:'Not found'}));
        }else {
			res.statusCode= 200;
			res.end(JSON.stringify({message:'Success'}));
        }
      });
    }
  })
}

// module.exports= UserController;