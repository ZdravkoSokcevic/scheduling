const router= require('express').Router();
const auth= require('../controller/auth');
const Appointment= require('../model/appointment');
const response= require('../controller/response');

// router.get('/all',(req,res,next)=> {
//     if(auth.auth()) {
//         next();
//     }else {
//         response.unauthorized(res);
//     }
// });

router.post('/insert',(req,res,next)=> {
    if(auth.admin()) {
        next();
    }else {
        response.unauthorized(res);
    }
});

router.post('/request',(req,res,next)=> {
    if(auth.auth()) {
        next();
    }else {
        response.unauthorized(res);   
    }
});

router.get('/status/change/:id',(req,res,next)=> {
    let id= req.params.id;
    if(id==null || id==undefined) {
        response.notFound(res); 
    }
    Appointment.findById(id).then(row=> {
        if(row==null) {
            response.notFound(404);
        }else {
            if( auth.admin() || (auth.dentist() && auth.getLoggedIn().id==row.dentist_id) ) {
                next();
            }else {
                response.unauthorized(res);
            }
        }
    });
});


module.exports= router;
