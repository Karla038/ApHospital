const express = require('express');
const cors = require('cors')
const { dbConnection } = require('./database/config');

// console.log( process.env );

require('dotenv').config();

//Crear el servidor de express
const app = express();

//Base de datos 
dbConnection();

//Cors
app.use(cors('*'));


//Directorio public
app.use( express.static('public'));


// Lectura y parseo del body
app.use(express.json( ));  //Midelware

//Rutas
// Midelware
// Ruta de autenticación del auth
app.use('/api/auth', require('./routes/auth'));
app.use('/api/Paciente', require('./routes/Paciente'));
app.use('/api/Cita', require('./routes/Cita'));
app.use('/api/especialidad',require('./routes/especialidad-routes'));
app.use('/api/diagnostico',require('./routes/diagnostico-routes'));
app.use('/api/medicina',require('./routes/medicina'))


//Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)
})