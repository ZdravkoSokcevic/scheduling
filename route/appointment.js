const router= require('express').Router();
const AppointmentController= require('../controller/appointment');

router.get('/all', AppointmentController.all);
router.post('/insert', AppointmentController.insert);
router.delete('/delete/:id', AppointmentController.delete);


module.exports= router;