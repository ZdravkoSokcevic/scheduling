const router= require('express').Router();
const bcrypt= require('bcrypt');
let conn= require('../model/database');
const UserController= require('../controller/user');

router.get('/',(req,res)=> {
  res.end('/user si dosao');
});


router.post('/insert',UserController.insert);

// router.get('/all',(req,res)=> {
//   res.end(JSON.stringify("Okej"));
// });
router.get('/all',UserController.allUsers);


module.exports= router;