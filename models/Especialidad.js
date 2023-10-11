const {Schema, model} = required('mongoose');

const EspecialidadSchema = Schema({
    name: {
        type: String, 
        require: true
    },
    question1: {
        type: String,
        require: true
    },
    question2:{
        type :String,
        require:true
    },
    question3:{
        type :String,
        require:true
    },
    question4:{
        type :String,
        require:true
    },
    question5:{
        type :String,
        require:true
    }

})

module.exports = model('Especialidad',EspecialidadSchema);
