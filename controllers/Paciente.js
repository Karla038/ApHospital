const { response } = require('express');
const paciente = require('../models/Paciente');

const crearPaciente = async(req, res= response) => {


    const { curp } = req.body;

    const nuevaEspecialidad = await paciente.findOne({ curp });

        if( nuevaEspecialidad ){
            return res.status(400).json({
                ok:false,
                msg: 'El paciente ya existe'
            })
        }

    const nuevoPaciente = new paciente(req.body);

    const pacienteGuardado = await nuevoPaciente.save();

    return res.status(201).json({
        ok: true,
        msg: 'Se registraron los datos',
        data:pacienteGuardado
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

const busquedaCurp = async (req, res) => {
    const parame = req.params.curp;

    const expReg = new RegExp(parame, 'i');

    const pacientes = await paciente.find({curp:expReg});


    return res.status(200).json({
        ok:true,
        msg:'La curp se consulto',
        data:pacientes
    })

}

const buscarPacienteId =async(req,res = response) =>{
    const id = req.params.id;
    
    // Obtener paciente id
    let pacientes;
    try {
        pacientes = await paciente.findById(id);
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
    obtenerPacientes,
    busquedaCurp,
    buscarPacienteId
}