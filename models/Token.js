const {Schema, model, default: mongoose} = require('mongoose');


const TokenSchema = Schema({
    endpoint: {
        type: String,
        require: true
    },
    expirationTime: {
        type: String,
    },
    keys:{
        p256dh:{
            type: String
        },
        auth: {
            type: String
        }
    }

});

module.exports = model('Token', TokenSchema);
