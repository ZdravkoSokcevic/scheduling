const router= require('express').Router();
const auth= require('../controller/auth');
const response= require('../controller/response');


router.get('/',(req, res, next)=> {
    auth.auth(req, res).then(authenticated=> {
        if(authenticated) {
            next();
        }else {
            response.unauthorized(res);
        }
    });
    // next();
})

// Only admins
router.get('/all',(req, res, next)=> {
    auth.admin(req, res).then(user=> {
        let isAdmin= (user.role=='admin');
        if(isAdmin) {
            return next();
        }else {
            response.unauthorized(res);
        }
    });
});

// Admin only can insert new user
router.post('/insert',(req, res, next)=> {
    auth.admin(req, res).then(isAdmin=> {
        if(isAdmin) {
            next();
        }else {
            response.unauthorized(res);
        }
    });
});

router.get('/get/:id',(req, res, next)=> {
    auth.admin(req,res).then(isAdmin=> {
        if(isAdmin.role=='admin' || isAdmin.id== req.params.id) {
            next();
        }else {
            response.unauthorized(res);
        }
    });
});


router.delete('/:id',(req, res, next)=> {
    auth.admin(req,res).then(isAdmin=> {
        if(isAdmin) {
            next();
        }
    });
    auth.auth(req, res).then(user=> {
        if(!user) {
            response.unauthorized(res);
        }else if(user.id== req.params.id) {
            next();
        }else {
            response.unauthorized(res);
        }
    });
});

// Can only self account to modify
router.post('/patch/:id',(req, res, next)=> {
    auth.admin(req, res).then(isAdmin=> {
        if(isAdmin) {
            next();
        }else {
            auth.auth(req, res).then(user=> {
                if(!user) {
                    response.unauthorized(res);
                }else if(user.id== req.params.id) {
                    next();
                }else {
                    response.unauthorized(res);
                }
            });   
        }
    });
});

// Doctors schedule
router.get('/:id/schedule',(req, res, next)=> {
    auth.auth(req, res).then(loggedIn=> {
        if(loggedIn){
            next();
        }else {
            response.unauthorized(res);
        }

    });
});






module.exports= router;