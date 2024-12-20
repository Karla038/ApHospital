const express = require('express');
const cors = require('cors')
const { dbConnection } = require('./database/config');
const webpush = require('web-push');


// console.log( process.env );

require('dotenv').config();

// console.log(process.env)

//Crear el servidor de express
const app = express();

//Base de datos 
dbConnection();

//Cors
app.use(cors('*'));


//token para el push de notificaciones
const VAPID_KEYS = { 
    publicKey: "BIlWKRxRCjukcYNwwi1eKPnspm7_A1HFrjI9KkFiIo-7Acj3iJOLqyEXSvhNUTiNT4B5_p9S2zOEL4bCemhHzn4",
    privateKey: "cgCyq4ANYABfZ9mu9r8IHqu_o7KRnVZwt00R3KDx8cc" 
}


webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    VAPID_KEYS.publicKey,
    VAPID_KEYS.privateKey

)


//Directorio public
app.use( express.static('public'));


// Lectura y parseo del body
app.use(express.json( ));  //Midelware

//Rutas
// Midelware
// Ruta de autenticación del auth
app.use('/api/auth', require('./routes/auth'));
app.use('/api/administrador', require('./routes/administrador-router'));
app.use('/api/Paciente', require('./routes/Paciente'));
app.use('/api/Cita', require('./routes/Cita'));
app.use('/api/especialidad',require('./routes/especialidad-routes'));
app.use('/api/diagnostico',require('./routes/diagnostico-routes'));
app.use('/api/medicina', require('./routes/medicina'));
app.use('/api/suscripciones', require('./routes/suscripciones-routes'));
app.use('/api/todo', require('./routes/busquedas-router'));
app.use('/api/token',require('./routes/token-router'))


// console.log('Puerto configurado para:', process.env.PORT);

//Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)
})

// app.listen(4001, () => {
//     console.log('Server Port 4001');
// })

module.exports = app; 