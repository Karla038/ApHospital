const {Schema, model} = require('mongoose');

const SuscripcionSchema = Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    sizeUsers:{
        type: Number,
        required:true
    },
    price: {
        type: String,
        required :true
    },
    
})
module.exports = model('Suscripciones', SuscripcionSchema);