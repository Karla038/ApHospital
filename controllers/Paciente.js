const { response } = require('express');
const paciente = require('../models/Paciente');

const crearPaciente = async(req, res= response) => {

    // return res.json({
    //     ok:true,
    //     msg:'Funciona'
    // })

    // const { name, fatherLastname, motherLastname, telephone } = req.body;

    let nuevoPaciente; 
    let pacienteGuardado;

    nuevoPaciente = new paciente(req.body);

    await nuevoPaciente.save(pacienteGuardado);

    return res.status(201).json({
        ok: true,
        msg: 'Se registraron los datos'
    })
}


module.exports = {
    crearPaciente
}