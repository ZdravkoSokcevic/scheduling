const router= require('express').Router();
const AnnouncementController= require('../controller/announcement');
const AnnouncementMiddleware= require('../middleware/announcement');

router.get('/', AnnouncementController.all);
router.post('/new', AnnouncementController.insert);


module.exports= router;