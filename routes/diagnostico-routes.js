const {Router} = require('express');
const { route } = require('./especialidad-routes');
const {guardarDiagnostico,busquedaHistorialMedico} = require('../controllers/Diagnostico');

const router = Router();

router.post('/guardarDiagnostico/:idCita',guardarDiagnostico)
router.get('/busquedaCurpDiagnostico/:idPaciente',busquedaHistorialMedico)

module.exports = router;