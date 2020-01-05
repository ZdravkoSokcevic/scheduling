const router= require('express').Router();
const response= require('../controller/response');

router.post('/',(req,res,next)=> {
    let data= req.body;
    if(data.permission=='grant') {
        next();
    }else {
        response.notFound(res);     
    }
});

router.post('/special',(req,res,next)=> {
    let data= req.body;
    if(data.permission=='grant') {
        next();
    }else {
        response.notFound(res);     
    }
})

module.exports= router;