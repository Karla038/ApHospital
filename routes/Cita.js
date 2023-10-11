const { Router } = require('express');
const router = Router();
const { agendarCita } = require('../controllers/Cita')


//ruta de agendar cita
router.post('/agendarCita', agendarCita);

module.exports = router;