const {Schema, model} = require('mongoose');

const CitaSchema = Schema({
    
    // Referencia de paciente
    paciente: {
        type: Schema.Types.ObjectId, 
        ref: 'Pacientes'},
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