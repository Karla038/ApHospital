const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();
const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas-controller');


router.get('/:busqueda', validarJWT, getTodo);
router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColeccion); 


module.exports = router;