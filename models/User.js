const {Schema, model} = require('mongoose');


const UserSchema = Schema({

    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type :String,
        require: true
    },      
    especialidad:{
        type: Schema.Types.ObjectId,
        ref: 'Especialidad',
        require: false
    }
    
})

module.exports = model('User', UserSchema);
