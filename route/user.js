const router= require('express').Router();
let conn= require('../model/database');
const bcrypt= require('bcrypt');

const UserController= require('../controller/user');
const userAuthRoute= require('../middleware/user_auth');
const loginController= require('../controller/login');


router.post('/login', loginController.login);
router.use('/', userAuthRoute);

router.post('/insert', UserController.insert);
router.get('/all', UserController.allUsers);
router.post('/patch', UserController.update);
router.get('/:id', UserController.loadById);
// router.get('/', UserController.loggedInUser);
router.delete('/:id', UserController.delete);

router.get('/:id/schedule', UserController.schedule);

module.exports= router;