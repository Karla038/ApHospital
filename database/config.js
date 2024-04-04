const mongoose= require('mongoose');

const DB_Connection = 'mongodb+srv://aphospital:KrFaQIvi9grg19KY@cluster0.rfvwvoj.mongodb.net/aphospital';

const dbConnection = async() => {

    try {

        await mongoose.connect( DB_Connection, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            // useCreateIndex: true
        });

        console.log('db conectada')

    }catch (error) {
        console.log(error);
        throw new Error('Error al conectar con la BD')
    }
}


module.exports = {
    dbConnection
}
