const router= require('express').Router();
let conn= require('../model/database');
const bcrypt= require('bcrypt');

const UserController= require('../controller/user');
const userMiddleware= require('../middleware/user_auth');
const loginController= require('../controller/login');


router.get('/', UserController.getAll);
router.post('/login', loginController.login);
router.get('/new', UserController.newUserView);
router.post('/new', UserController.insert);
router.get('/edit/:id', UserController.loadEditView);
router.post('/edit/:id', UserController.update);
router.get('/delete', UserController.delete);
router.use('/', userMiddleware);

router.get('/all', UserController.allUsers);
router.post('/patch/:id', UserController.update);
router.get('/:id', UserController.loadById);
// router.get('/', UserController.loggedInUser);

router.get('/:id/schedule', UserController.schedule);

module.exports= router;