const {Router} = require('express');
const {obtenerEspecialidades} = require('../controllers/Especialidad');

// Inicializando la variable con Router
const router = Router();


router.get('/obtener_todos',obtenerEspecialidades);


module.exports = router;



