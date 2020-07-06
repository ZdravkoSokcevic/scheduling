const router = require('express').Router();
const Auth= require('../controller/auth');

router.use('/', async(req,res,next) => {

	router.handleFlashMessages(req,res);
	
	let user = await Auth.getUser(req,res);
	let isAdmin = false;
	let isPatient = false;
	let isDentist = false;
	let role = null;

	if(!user) 
		user = null;

	if(user && user.role == 'admin')
		isAdmin = true;

	if(user && user.role == 'patient')
		isPatient = true;

	if(user && user.role == 'dentist')
		isDentist = true;

	if(user && user.role)
		res.locals.loggedInRole = user.role;

	res.locals.user = user;
	res.locals.admin = isAdmin;
	res.locals.patient = isPatient;
	res.locals.dentist = isDentist;
	next();
})

router.handleFlashMessages = (req,res) => {
	// Handle flash messages 
	// when we use res.redirect()
	
	let flash = req.flash();
	for(let message in flash) {
		res.locals[message] = flash[message];
	}
}

module.exports = router;