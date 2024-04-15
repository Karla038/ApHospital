const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const RegistroMedicoSchema = mongoose.Schema({

    // Referencia al la cita agendada
    cita: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cita',
        require: true
    },
    especialidad: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Especialidad',
        require: true
    }, 
    diagnostico: {
        type: String,
        required: true
    },
    tratamiento: {
        type: String,
        require: true
    }

})

module.exports = model('registro-medico', RegistroMedicoSchema);