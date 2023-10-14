const { response } = require('express');
const paciente = require('../models/Paciente');

const crearPaciente = async(req, res= response) => {


    const { curp } = req.body;

    nuevaEspecialidad = await paciente.findOne({ curp });

        if( nuevaEspecialidad ){
            return res.status(400).json({
                ok:false,
                msg: 'El paciente ya existe'
            })
        }

    let nuevoPaciente; 
    let pacienteGuardado;

    nuevoPaciente = new paciente(req.body);

    await nuevoPaciente.save(pacienteGuardado);

    return res.status(201).json({
        ok: true,
        msg: 'Se registraron los datos'
    })
}


const obtenerPacientes = async(req,res = response ) =>{

    
    // Obtener todos los pacientes
    let pacientes = [];
    try {
        pacientes = await paciente.find();
        console.log(pacientes)
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'No se pudo obtener pacientes'
            
        })
    }   

    return res.status(200).json({
        ok:true,
        msg:'Los pacientes se consultaron correctamente',
        data:pacientes
    })    
}


module.exports = {
    crearPaciente,
    obtenerPacientes
}