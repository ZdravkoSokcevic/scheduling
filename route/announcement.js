const router= require('express').Router();
const AnnouncementController= require('../controller/announcement');
const AnnouncementMiddleware= require('../middleware/announcement');
// const AuthMiddleware= require('../middleware/session');

router.get('/', AnnouncementMiddleware);

router.get('/', AnnouncementController.all);
router.post('/new', AnnouncementController.insert);
router.get('/delete', AnnouncementController.delete);


module.exports= router;