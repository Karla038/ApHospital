const {Router} = require('express');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {agregarUsuarioNuevoAdmin,
obtenerTodosLosUsuarios,
agregarUsuarioNuevoAdminEmail,
eliminarUsuario,
actualizarUsuario} = require('../controllers/administrador-controller.js');

const router = Router();
router.post('/agregarNuevoUsuario', 
    [ //Middelwares
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
    validarCampos
    ],
    agregarUsuarioNuevoAdmin
);

router.post('/agregarNuevoUsuarioEmail', 
    [ //Middelwares
    check('idUsuarioAdmin', 'El idUsuarioAdmin es obligatorio').isMongoId(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos
    ],
    agregarUsuarioNuevoAdminEmail
);

router.put('/actualizarUsuario', 
    [ //Middelwares
    check('idUsuario', 'El idUsuarioAdmin es obligatorio').isMongoId(),
    validarCampos
    ],
    actualizarUsuario
);
router.get('/obtenerTodosUsuarios/:idUsuarioAdmin',obtenerTodosLosUsuarios)
router.post('/eliminarUsuario',eliminarUsuario)


module.exports = router;