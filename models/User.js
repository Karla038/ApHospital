const {Schema, model, default: mongoose} = require('mongoose');


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
    },
    suscripcion:{
        name: {
            type: String,
        },
        description:{
            type:String,
        },
        sizeUsers:{
            type: Number,
        },
        price: {
            type: String,
        },
        dateSuscription:{
            type: Date,
        }
    },
    usuariosSuscripcion:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    google:{
        type: Boolean,
        default: false
    }
    
})

module.exports = model('User', UserSchema);
