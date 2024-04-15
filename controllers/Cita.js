const {response} = require('express');
const Paciente = require('../models/Paciente');
// const crearPaciente = require('../controllers/Paciente');
const Cita = require('../models/Cita');
const User = require('../models/User');

const Publisher = require('../observer/Publisher');
const {notificacionDoctorCita} = require('../helpers/cita-agendada');


const agendarCita = async(req, res=response) => {

    //Esta línea crea una nueva instancia del objeto Publisher. 

    const publisher = new Publisher();  

    const {paciente,doctor ,day,month,year,startHour} = req.body;
    let nuevaCita;

    const doctorId = await User.findById(doctor); 
    const pacienteId = await Paciente.findById(paciente); 
    
    const fechaFormateada  = `${year} ${month} ${day} ${startHour}` 

    const datosEmail = {  
        nombreDoctor: doctorId.name,
        emailDoctor: doctorId.email,
        nombrePaciente: pacienteId.name,
        fecha:fechaFormateada
    }

    // Se suscribe para enviar el correo al doctor que se le agendo la cita
    //Se está llamando al método suscribe del publisher para añadir un nuevo observador.
        
    publisher.suscribe('email',() =>notificacionDoctorCita(datosEmail));   

    try {
        
     console.log("Agendar Cita")   

    // const fechaHoy = new Date();
    
    nuevaCita = await Cita.find({ 
        $and:[
            {year:year},
            {month:month},
            {day:day},
            {startHour:startHour},
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
            {year:year},
            {month:month},
            {day:day},
            {startHour:startHour},
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
    // Definiendo que la cita se agende a false
    req.body.attended = false;

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
    // Si no hay un error, llamamos a nuestro metodo
    //F Esto hará que el publisher notifique a todos los observadores

    publisher.notify('email');  


    // Responder con la cita creada
    return res.status(201).json({
        ok: true,   
        msg:'La cita se agendo correctemente',     
        data: nuevaCita
    });
};


const obtenerCitasPorDoctor = async(req,res = response) =>{

    const idDoctor = req.params.idMedico;

    try {  

        if(!idDoctor){
            return res.status(500).json({
                ok:true,
                msg:'El doctor no existe',
                data:citas
            })
        }

        const fecha = new Date();
        const year = fecha.getFullYear();
        const month = fecha.getMonth();
        const day = fecha.getDate();

        const citas = await Cita.find({ 
            $and:[
                {year:year},
                {month:month},
                {day:day},
                {doctor:idDoctor}
            ]
        })    
        .populate({
            path:'doctor',
            model:'User',
            populate:{
                path: 'especialidad',
                model: 'Especialidade',
                select: 'name question1 question2 question3 question4 question5'
            }        
        }).populate({
            path: 'paciente',
            select: 'name fatherLastname motherLastname telephone curp'
        });


        return res.status(200).json({
            ok:true,
            msg:'Las citas del doctor se encontrarón correctamente',
            data:citas
        })
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'No se pudo obtener las citas del medico'
        })
    }

} 


module.exports = {
    agendarCita,
    obtenerCitasPorDoctor
}



