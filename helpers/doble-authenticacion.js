const sgMail = require('@sendgrid/mail');


const enviarDobleAuthenticacion = async (datos) => {

    sgMail.setApiKey(process.env.SEND_GRID);

    const {email, name,authenticacionDoble} = datos;

    const mensaje = {
        
        to: email, 
        from: 'shub64127@gmail.com',
        subject: 'Verificación de dos pasos a CITAVITA',
        text: "Comprueba tu cuenta en CITAVITA",
        html: `
        <p>Hola: ${name} Comprueba tu cuenta en CITAVITA</p>
        <p>Tu codigo de verificacion es: ${authenticacionDoble}
        <p> Si tu no pediste el acceso a tu cuenta 
        cambia tu contraseña en la app de CITAVITA</p>`        
    }

    await sgMail.send(mensaje).then(()=>{
        console.log('Email Enviado');
    }).catch((error)=>{
        console.log(error);
    })

}


module.exports = {
    enviarDobleAuthenticacion
}