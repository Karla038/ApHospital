const {response} = require('express');
const paciente = require('../models/Paciente');
// const crearPaciente = require('../controllers/Paciente');
const Cita = require('../models/Cita');



const agendarCita = async(req, res=response) => {

    const { paciente } = req.body;


    let nuevaCita;
        
    try {
     console.log("Agendar Cita")   
    
    // const fechaHoy = new Date();
    
    nuevaCita = await Cita.find({ paciente });
    //const fechaCita = new Date(nuevaCita.date);
    //fecha.getDay === 


    console.log(nuevaCita);

    if (nuevaCita) {
        return res.status(400).json({
            ok: false,
            msg: 'El paciente ya tiene una cita agendada'
        });
    }

    console.log("pase del if")

    // Crear una nueva cita
    nuevaCita = new Cita(req.body);

    console.log(nuevaCita)
    // Guardar la cita en la base de datos
    await nuevaCita.save();
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'No se puede agendar la cita'
        })
    }

    // Responder con la cita creada
    return res.status(201).json({
        ok: true,        
        data: nuevaCita
    });
};


module.exports = {
    agendarCita
}



