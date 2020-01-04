const router= require('express').Router();
const auth= require('../controller/auth');
const response= require('../controller/response');


router.get('/',(req,res,next)=> {
    if(auth.auth()) {
        next();
    }else {
        response.unauthorized(res);
    }
})

// Only admins
router.get('/all',(req,res,next)=> {
    if(auth.admin()) {
        next();
    }else {
        response.unauthorized(res);
    }
});

// Admin only can insert new user
router.post('/insert',(req,res,next)=> {
    if(auth.admin()) {
        next();
    }else {
        response.unauthorized(res);
    }
});

router.get('/:id',(req,res,next)=> {
    if(auth.admin()) {
        next();
    }else if(auth.getLoggedIn().id== req.params.id) {
        next();
    }else {
        response.unauthorized(res);
    }
});


router.delete('/:id',(req,res,next)=> {
    if(auth.admin()) {
        next();
    }
    else if(auth.auth() && auth.getLoggedIn().id==req.params.id) {
        next
    }else {
        response.unauthorized(res);
    }
});

// Can only self account to modify
router.post('/patch/:id',(req,res,next)=> {
    if(auth.auth() && auth.getLoggedIn().id==req.params.id) {
        next();
    }
    else if(auth.admin()) {
        next();
    }
    else {
        response.unauthorized(res);
    }
});

// Doctors schedule
router.get('/:id/schedule',(req,res,next)=> {
    if(auth.auth()) {
        next();
    }else {
        response.unauthorized(res);
    }
});






module.exports= router;