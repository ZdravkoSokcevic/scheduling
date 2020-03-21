const router= require('express').Router();

router.get('/',async(req,res,next)=> {
	if(req.session && req.session.user !== 'undefined' && typeof req.session.user!=='undefined')
		next();
	else {
		res.redirect('/');
	}
});

module.exports= router;
