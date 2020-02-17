const router= require('express').Router();
const user= require('../controller/auth');


router.get('/new',async(req,res,next)=> {
	let user= await user.getUser();
	if(user && (user.role=='admin'|| user.role=='dentist'))
		next();
	else res.redirect('/');

});

module.exports= router;