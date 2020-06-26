const router= require('express').Router();
const User= require('../controller/auth');

// Change activation status (admin only)
router.use('/activate', async(req,res,next) => {
	let user = await User.getUser();
	if(user == null || (user.role && user.role != 'admin')) {
		// Session flash not allowed
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