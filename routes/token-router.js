const {Router} = require('express');

const {savePush,sendPush} = require('../controllers/token-controller');

const router = Router();


router.post('/guardar',savePush)
router.post('/enviarNotificacion',sendPush)

module.exports = router;