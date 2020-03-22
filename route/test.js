const router= require('express').Router();
const TestController= require('../controller/test');
const AppointmentController= require('../controller/appointment');
const TestMiddleware= require('../middleware/test');

router.post('/session', (req,res)=> {
    // res.send({pera:'djetlic'});
    res.end(JSON.stringify(req.session));
});
router.use('/', TestMiddleware);
router.get('/', TestController.home);
router.post('/', TestController.home);
router.post('/datetest', AppointmentController.isDentistFreeCheck);
router.get('/special', TestController.loggedIn);
router.post('/special', TestController.loggedIn);

router.get('/async', TestController.async);

module.exports= router;