/*
Rutas de Usuarios / Auth
host + api/auth
*/

const {Router} = require('express');
// Es el middelware que valida un campo en particular 
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const { obtenerUsuarioId, busquedaDoctor, crearUsuario, loginUsuario, revalidarToken} = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();
// Ruta para obtener por id

router.get('/buscar_id/:id',obtenerUsuarioId);

// ruta para obtener la especialidad
router.get('/busqueda_doctor/:role',busquedaDoctor);

// ruta de registro
router.post('/new', 
    [ //Middelwares
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
    validarCampos
    ],
    crearUsuario
);

// Ruta del login
router.post('/', 
    [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
    validarCampos
    ], 
    loginUsuario
);

// ruta del token, genera jsonWebToken
router.get('/renew', validarJWT, revalidarToken);

module.exports = router;