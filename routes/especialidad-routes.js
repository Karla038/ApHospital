const {Router} = require('express');
const {obtenerEspecialidades} = require('../controllers/Especialidad');
const { guardarEspecialidad } = require('../controllers/Especialidad');
const router = Router();

router.post('/guardarEspecialidad', guardarEspecialidad);

router.get('/obtener_todos',obtenerEspecialidades);

module.exports = router;





