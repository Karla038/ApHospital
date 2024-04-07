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
    },
    suscripcion:{
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
        dateSuscription:{
            type: Date,
            required : true,
            default: Date.now()

        }
    },
    google:{
        type: Boolean,
        default: false
    }
    
})

module.exports = model('User', UserSchema);
