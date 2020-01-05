const router= require('express').Router();
const TestController= require('../controller/test');
const TestMiddleware= require('../middleware/test');

router.use('/', TestMiddleware);
router.get('/', TestController.home);
router.post('/', TestController.home);
router.get('/special', TestController.loggedIn);
router.post('/special', TestController.loggedIn);

module.exports= router;