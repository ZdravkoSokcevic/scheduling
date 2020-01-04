// const conn= require('../model/database');
const UserModel= require('../model/user');
const auth= require('./auth');


exports.allUsers= (req,res)=> {
  UserModel.all().then(result=> {
    res.statusCode=200;
    result.forEach(element => {
      delete element.password;
      delete element.access_token;
      delete element.remember_token;
    });
    res.statusCode= 200;
    res.header({'Content-Type':'application/json'});
    res.end(JSON.stringify(result));
  });
}

exports.insert= (req,res)=> {
  let data= req.body;
  if(data.role===null) {
    data.role='user';
  } 
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
  let id= req.params.id;
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

exports.loadById= (req,res)=> {
  let id= req.params.id;
  UserModel.findById(id).then(user=> {
    res.header({'Content-Type':'application/json'});
    if(user==null) {
      res.statusCode= 200;
      let data={};
      res.end(JSON.stringify({data}));
    }else {
      res.statusCode= 200;
      delete user.password;
      delete user.access_token;
      delete user.remember_token;
      res.end(JSON.stringify(user));
    }
  });
}

/**
 * Doctor only
 */
exports.schedule= (req,res)=> {
  id= req.params.id;
  res.header({'Content-Type':'application/json'});
  if(id==null) {
    res.statusCode= 404;
    res.end(JSON.stringify({message:'not found'}));
  }else {
    UserModel.findById(id).then(result=> {
      if(result==null) {
        res.statusCode= 404;
        res.end(JSON.stringify({message:'not found'}));
      }else {
        UserModel.loadScheduleById(id).then(results=> {
          if(results!==null) {
            res.statusCode= 200;
            res.end(JSON.stringify(results));
          }else {
            res.statusCode= 404;
            res.end(JSON.stringify({message:'failed'}));
          }
        }); 
      }
    });
  }   
}

let loggedInUser= (req,res)=> {
  return auth.getLoggedIn();
}

// module.exports= UserController;