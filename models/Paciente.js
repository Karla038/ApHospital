const {Schema, model} = require('mongoose');

const PacienteSchema = Schema({
    name: {
        type: String,
        required: true
    },
    fatherLastname: {
        type: String,
        required :true
    },
    motherLastname:{
        type:String,
        required:true
    },
    telephone:{
        type: Number,
        required:true,

    }
})



module.exports = model('Paciente', PacienteSchema);