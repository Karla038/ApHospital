const sgMail = require('@sendgrid/mail');

const emailOlvidePassword = async (datos) => {

    sgMail.setApiKey(process.env.SEND_GRID);

    const { email, name, token } = datos;

    const mensaje = {
        
        to: email, 
        from: 'shub64127@gmail.com',
        subject: 'Solicitud de restablecimiento de contraseña',
        text: "Restablece tu password en Citavita",
        html: `
        <p>Hola: ${name} has solicitado reestablecer tu contraseña</p>
        <p>Sigue el siguiente enlace para generar una nueva contraseña:
        <a href="http://localhost:4200/users/reset-password/${token}">Reestablecer contraseña</a>
        </p>
        <p>Si no deseas reestablecer tu contraseña has caso omiso al  correo y puedes eliminarlo.</p>
        `
    }

    await sgMail.send(mensaje).then(()=>{
        console.log('Email Enviado');
    }).catch((error)=>{
        console.log(error);
    })

}


module.exports = {
    emailOlvidePassword
}