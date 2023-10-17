const { Router } = require('express');
const router = Router();
const { agendarCita,obtenerCitasPorDoctor } = require('../controllers/Cita')


//ruta de agendar cita
router.post('/agendarCita', agendarCita);
router.get('/obtenerCitasDoctor/:idMedico',obtenerCitasPorDoctor);

module.exports = router;