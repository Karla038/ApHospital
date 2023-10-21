const {Schema,model} = require('mongoose');

const DiagnositicoSchema = Schema({
    especialidad:{
        type: Schema.Types.ObjectId,
        ref:'Especialidad',
        require: true
    },
    paciente:{
        type: Schema.Types.ObjectId,
        ref: 'Paciente',
        require: true
    },
    respuesta1:{
        type:String,
        require:true
    },
    respuesta2:{
        type:String,
        require:true
    },
    respuesta3:{
        type:String,
        require:true
    },
    respuesta4:{
        type:String,
        require:true
    },
    respuesta5:{
        type:String,
        require:true
    },
    resultadoDiagnostico:{
        type:String,
        require:true
    }
})

module.exports = model('Diagnostico',DiagnositicoSchema);