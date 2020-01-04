const router= require('express').Router();
const AppointmentController= require('../controller/appointment');
const AppointmentMiddleware= require('../middleware/appointment_auth');

router.use('/', AppointmentMiddleware);
router.get('/all', AppointmentController.all);
router.post('/insert', AppointmentController.insert);
router.delete('/delete/:id', AppointmentController.delete);

router.post('/request', AppointmentController.request);


module.exports= router;