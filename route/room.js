const router = require('express').Router();

const RoomController = require('../controller/room');

router.get('/', RoomController.loadRoomsView);
router.get('/add', RoomController.loadAddRoomsView);
router.post('/add', RoomController.store);
router.get('/all', RoomController.all);
router.get('/edit/:id', RoomController.loadEditView);
router.post('/edit/:id', RoomController.edit);
router.get('/delete',RoomController.delete);

module.exports= router;