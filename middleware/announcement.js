const router= require('express').Router();
const User= require('../controller/auth');

// Handle flash messages
router.use('/', (req,res,next) => {
	
	next();
})
// Change activation status (admin only)
router.use('/activate', async(req,res,next) => {
	let user = await User.getUser(req,res);
	console.log('User: ');
	console.log(user);
	if(user == false || user == null || (user.role && user.role != 'admin')) {
		// Session flash not allowed
		console.log('flash message');

		req.flash('code', 404);
		req.flash('message', 'Nije dozvoljeno!');
		res.redirect('/announcement');
		return;
	}

	next();
})

router.get('/new',async(req,res,next)=> {
	let user= await User.getUser(req,res);
	if(user && (user.role=='admin'|| user.role=='dentist')) {
		res.send({role:user.role});
		next();
	}
	else res.redirect('/');

});

module.exports= router;