const {Router} = require('express');
const { obtenerSuscripciones } = require('../controllers/suscripciones-controller');


const router = Router();

router.get('/obtener_todos',obtenerSuscripciones);

module.exports = router;