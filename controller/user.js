// const conn= require('../model/database');
const UserModel= require('../model/user');
const response= require('./response');
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
  if(data.role=='undefined' || data.role==null) {
    data.role='patient';
  } 
  UserModel.insert(data).then(response=> {
    if(!response) {
      res.statusCode=404;
      // res.end(JSON.stringify('Error'));
      res.redirect('/user');
    }else {
      res.statusCode=200;
      res.redirect('/user');
    }
  });
}

exports.update= (req,res)=> {
  let data= req.body;
  let id= req.params.id;
  UserModel.findById(id).then(user=> {
    for(let x in user) {
      if(!(x in data)) {
        data[x]= user[x]; 
      }
    }
    auth.admin(user=> {
      if(!user) {
        data.role= user.role;
      }
    })
    UserModel.update(data).then(response=> {
      if(!response) {
        res.statusCode= 404;
        // res.end(JSON.stringify({message:'not found'}));
        res.redirect('/user');
      }else {
        res.statusCode= 200;
        // res.end(JSON.stringify({message:'success'}));
        res.redirect('/user');
      }
    });
  }).catch(err=> {
    response.notFound(res);
  });
}

exports.delete= (req,res)=> {
  let id= req.query.id;
  UserModel.findById(id).then(result=> {
    if(result==null) {
      res.statusCode= 404;
      res.redirect('/user');
    }else {
      UserModel.delete(id).then(success=> {
        if(!success) {
          res.statusCode= 404;
          res.redirect('/user');
        }else {
          res.statusCode= 200;
          res.redirect('/user');
        }
      });
    }
  });
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

exports.getAll= (req,res)=> {
  let data= req.query;
  UserModel.searchOrAll(data).then(users=> {
    res.render('users.ejs',{
      users: users,
      search: data.search,
      role: data.role
    });
  }).catch(err=> {
    res.end(JSON.stringify(err));
  });
}

exports.loadEditView= (req,res)=> {
  let id= req.params.id;
  if(id==null || id==undefined) {
    res.render('login.ejs');
  }else {
    UserModel.findById(id).then(user=> {
      if(user) {
        res.render('user_edit.ejs',{user:user});
      }else {
        res.render('login.ejs');
      }
    });
  }
}

exports.newUserView= (req,res)=> {
  res.render('users_new.ejs');
}


let loggedInUser= (req,res)=> {
  return auth.getLoggedIn();
}

// module.exports= UserController;