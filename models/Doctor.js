const {Schema, model} = require('mongoose');

const DoctorSchema = Schema({
    name:{
        type:String,
        requires: true
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
    },
    email:{
        type:String,
        required: true,
        unique: true
    }

})


module.exports = model('Doctor',DoctorSchema)