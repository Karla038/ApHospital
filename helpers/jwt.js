const jwt = require('jsonwebtoken');

const generarJWT = ( uid, name) => {
    return new Promise((resolve, reject) => {

        const payload = { uid, name};

        jwt.sign( payload,`${process.env.SecretToken}`, {
            expiresIn: '5m'
        }, (err, token ) => {
            if ( err ){
                console.log(err);
                reject("Error al crear el Token");
            }
            resolve( token );
        })


    })
}

module.exports = {
    generarJWT
}