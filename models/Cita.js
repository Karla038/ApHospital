const {Schema, model} = require('mongoose');
const mongoose = require('mongoose')

const CitaSchema = mongoose.Schema({
    // Referencias a los usuarios
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        require: true
    },    
    // Referencia de paciente
    paciente: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Paciente',
        require: true
    },
    age:{
        type: Number,
        required: true, 
    },
    weight: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    temperature: {
        type: Number,
        required: true
    },
    pressureArterial: {
        type: Number,
        required: true
    },
    heartrate: {
        type: Number,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    hour: {
        type: Number,
        required: true
    },
    note:{
        type: String,
        required:false
    }
})

module.exports = model('Cita', CitaSchema);