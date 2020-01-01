const router= require('express').Router();
const bcrypt= require('bcrypt');
let conn= require('../model/database');
const UserController= require('../controller/user');

router.get('/',(req,res)=> {
	res.end('/user si dosao');
});


router.post('/insert',UserController.insert);
router.get('/all',UserController.allUsers);
router.post('/patch',UserController.update);
router.delete('/:id',UserController.delete);

module.exports= router;