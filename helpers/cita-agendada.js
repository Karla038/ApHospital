const sgMail = require('@sendgrid/mail');


const notificacionDoctorCita = async (datos)  =>{

    sgMail.setApiKey(process.env.SEND_GRID);

    const {
        nombreDoctor,
        emailDoctor,
        nombrePaciente,
        fecha
    } = datos;

    const mensaje = {
        to:emailDoctor,
        from: 'shub64127@gmail.com',
        subject: 'Una persona agendo una cita',
        // text: ` `,
        html: `
        <p>Hola Doctor(a) ${nombreDoctor} tiene una cita agendada el dia ${fecha} horas MX</p>
        <p> El paciente con el nombre ${nombrePaciente} </p>`           
         
    }
    // console.log(m)

    await sgMail.send(mensaje).then(()=>{
        console.log('Email Enviado');
    }).catch((error)=>{
        console.log(error);
    })
}

module.exports = {
    notificacionDoctorCita
}