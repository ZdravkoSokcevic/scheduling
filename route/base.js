const router= require('express').Router();
const BaseController= require('../controller/base');
const AuthController= require('../controller/auth');
const UserController= require('../controller/user');

router.get('/', BaseController.index);

router.get('/login', (req,res)=> {
    res.render('login.ejs');
});

router.post('/login', AuthController.login);

router.post('/register', UserController.insert);



module.exports= router;