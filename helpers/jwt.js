const jwt = require('jsonwebtoken');

const generarJWT = ( uid, name) => {
    return new Promise((resolve, reject) => {

        const payload = { uid, name};

        jwt.sign( payload,`${process.env.SecretToken}`, {
            expiresIn: '3m'
        }, (err, token ) => {
            if ( err ){
                console.log(err);
                reject("Error al crear el Token");
            }
            resolve( token );
        })


    })
}

const verificarToken = ( token ) => {

    return new Promise((resolve, reject)=>{
        jwt.verify(token,`${process.env.SecretToken}`,(error,decode) =>{
            if(error){
                console.log(error);
                reject('No se pudo generar el JWT')
            }else{
                const fechaExpiracionLocal = new Date(decode.exp * 1000);
                console.log(fechaExpiracionLocal)
                const fechaInicalLocal = new Date(decode.iat * 1000);
                console.log(fechaInicalLocal);
                const fechaInicial = new Date(fechaInicalLocal);
                console.log("Fecha inicial " + fechaInicial)
                const fechaExpiracion = new Date(fechaExpiracionLocal);
                console.log("Fecha expiracion " + fechaExpiracion)
                const fechas = {
                    fechaInicial,
                    fechaExpiracion
                }
                resolve(fechas)
            }
        })

    }); 
}

module.exports = {
    generarJWT,
    verificarToken
}