const router= require('express').Router();
const bcrypt= require('bcrypt');
let conn= require('../model/database');
const UserController= require('../controller/user');

router.get('/',(req,res)=> {
	res.end('/user si dosao');
});


router.post('/insert', UserController.insert);
router.get('/all', UserController.allUsers);
router.post('/patch', UserController.update);
router.get('/:id', UserController.loadById);
router.delete('/:id', UserController.delete);

module.exports= router;