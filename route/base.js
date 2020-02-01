const router= require('express').Router();
const baseController= require('../controller/base');

router.get('/', baseController.index);

router.get('/login', (req,res)=> {
    res.render('login.ejs');
});



module.exports= router;