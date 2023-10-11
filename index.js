const express = require('express');
require('dotenv').config();
const cors = require('cors')
const { dbConnection } = require('./database/config');

// console.log( process.env );

//Crear el servidor de express

const app = express();

//Base de datos 
dbConnection();

//Cors
app.use(cors());


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



//Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)
})