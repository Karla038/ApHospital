const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { crearDoctor } = require('../controllers/Doctor');
const { validarCampos } = require('../middlewares/validar-campos');

router.post('/crearDoctor',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('fatherLastname', 'Este campo es obligatorio').not().isEmpty(),
        check('motherLastname', 'Este campo es obligtorio').not().isEmpty(),
        check('telephone', 'El número es obligatorio').isLength({ max: 10 }),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ],
    crearDoctor
);


module.exports = router;
