const {Router} = require('express');
const router = Router();
const { check } = require('express-validator')
const { crearPaciente } = require('../controllers/Paciente');
const { obtenerPacientes } = require('../controllers/Paciente');
const { busquedaCurp,buscarPacienteId } = require('../controllers/Paciente')
const { validarCampos } = require('../middlewares/validar-campos');

//ruta de crear paciente

router.post('/crearPaciente', 
[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('fatherLastname', 'Este campo es obligatorio').not().isEmpty(),
    check('motherLastname', 'Este campo es obligtorio').not().isEmpty(),
    check('telephone', 'El número es obligatorio').isLength({ max: 10 }),
    check('curp', 'La curp es obligatoria').isLength({ max: 18 }),
    validarCampos
],crearPaciente);

router.get('/obtenerTodosPacientes',obtenerPacientes)

router.get('/buscaPorCurp/:curp', busquedaCurp)

router.get('/buscarPorId/:id',buscarPacienteId);

module.exports = router;
