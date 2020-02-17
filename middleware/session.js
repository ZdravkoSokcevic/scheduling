const router= require('express').Router();
const session= require('express-session');

router.get('/', (req,res,next)=> {
	console.log(req.path);
	// next();
	if((req.path=='/login' || req.path=='/') && req.session && req.session.user !== 'undefined' && typeof req.session.user!=='undefined')
		next();
	else res.end(JSON.stringify('Nije proso'));
});


module.exports= router;