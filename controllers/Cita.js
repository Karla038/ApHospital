const {response} = require('express');
const paciente = require('../models/Paciente');
// const crearPaciente = require('../controllers/Paciente');
const Cita = require('../models/Cita');



const agendarCita = async(req, res=response) => {

    const {hour,paciente,doctor ,date} = req.body;

    let nuevaCita;

        
    try {
     console.log("Agendar Cita")   
    
    // const fechaHoy = new Date();
    
    nuevaCita = await Cita.find({ 
        $and:[
            {hour:hour},
            {paciente:paciente}
        ]
    });
    //const fechaCita = new Date(nuevaCita.date);
    //fecha.getDay === 
   


    console.log(nuevaCita);

    if (nuevaCita.length >= 1) {
        return res.status(400).json({
            ok: false,
            msg: 'El paciente ya tiene una cita agendada'
        });
    }

    const doctorCita = await Cita.find({ 
        $and:[
            {hour:hour},
            {doctor:doctor}
        ]
    });

    if (doctorCita.length >= 1) {
        return res.status(400).json({
            ok: false,
            msg: 'El Doctor ya tiene una cita agendada para esta hora'
        });
    }

    console.log("pase del if")

    // Crear una nueva cita
    const cita = new Cita(req.body)

    console.log(cita)
    console.log(req.body)
    // Guardar la cita en la base de datos
    await cita.save();
    
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'No se puede agendar la cita'
        })
    }

    // Responder con la cita creada
    return res.status(201).json({
        ok: true,   
        msg:'La cita se agendo correctemente',     
        data: nuevaCita
    });
};


module.exports = {
    agendarCita
}



