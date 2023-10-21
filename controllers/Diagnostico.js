const {response} = require('express');
const Diagnostico = require('../models/Diagnostico');
const Especialidad = require('../models/Especialidad');
const Paciente = require('../models/Paciente');
const Cita = require('../models/Cita');



const guardarDiagnostico = async(req, res = response) =>{

    const idCita =  req.params.idCita;

    const diagnostico = req.body;

    try {

        const especialidad = await Especialidad.findById(diagnostico.especialidad);

        if(!especialidad){
            return res.status(404).json({
                ok: false,
                msg: 'La especialidad no existe'
            })  
        }


        const paciente = await Paciente.findById(diagnostico.paciente);
        if(!paciente){
            return res.status(404).json({
                ok: false,
                msg: 'El paciente no existe'
            })  
        }


        const cita = await Cita.findById(idCita);

        if(!cita){
            return res.status(404).json({
                ok: false,
                msg: 'La cita no existe'
            })  
        }
        cita.attended = true;
        
        const diagnositicoDB = new Diagnostico(diagnostico);
        await diagnositicoDB.save();
        await cita.save();
         // Responder con la cita creada
        return res.status(201).json({
            ok: true,   
            msg:'El diagnostico se guardo correctemente',     
            data: diagnositicoDB
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'No se puede realizar el registro'
        })  
        
    }   
}


const busquedaHistorialMedico = async (req, res) => {
    const id = req.params.idPaciente;
    console.log(id)
    const historial = await Diagnostico.find({}).populate({
        path:'paciente',
        model:'Paciente',
        select:'name curp',
        match:{_id:id},
    }).populate({
        path: 'especialidad',
        model:'Especialidad',
        select:'name question1 question2 question3 question4 question5'
    });

    if(historial[0].paciente === null){
        return res.status(404).json({
            ok:true,
            msg:'No existen historial',
            data:null
        });
    }


    return res.status(200).json({
        ok:true,
        msg:'La curp se consulto',
        data:historial
    })

}

module.exports = {
    guardarDiagnostico,
    busquedaHistorialMedico
}