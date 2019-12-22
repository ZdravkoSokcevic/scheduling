const conn= require('../model/database');
const UserModel= require('../model/user');

// let UserController= {
//   all: (req,res)=> {
//     return new Promise((res,rej)=> {
//       UserModel.all().then(result=> {
//         res.statusCode=200;
//         res.end(JSON.stringify(result));
//       });
//     });
//   }
// }

exports.allUsers= (req,res)=> {
  UserModel.all().then(result=> {
    res.statusCode=200;
    res.end(JSON.stringify(result));
  });
}

// module.exports= UserController;