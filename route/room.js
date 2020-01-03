const router = require('express').Router();

const RoomController = require('../controller/room');

router.get('/all', RoomController.all);
router.post('/insert', RoomController.store);
router.delete('/delete/:id',RoomController.delete);

module.exports= router;