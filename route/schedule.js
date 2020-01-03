const router= require('express').Router();
const ScheduleController= require('../controller/schedule');

// ToDo get done things about schedule

router.get('/all', ScheduleController.all);
router.post('/insert', ScheduleController.insert);
router.delete('/delete/:id', ScheduleController.delete);

module.exports= router;