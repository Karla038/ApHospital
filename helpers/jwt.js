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

const verificarToken = ( token ) => {

    return new Promise((resolve, reject)=>{
        jwt.verify(token,`${process.env.JWT_SECRET}`,(error,decode) =>{
            if(error){
                console.log(error);
                reject('No se pudo generar el JWT')
            }else{
                const fechaExpiracionLocal = new Date(decode.exp * 1000).toLocaleString()
                const fechaInicalLocal = new Date(decode.iat * 1000).toLocaleString()
                const fechaInicial = new Date(fechaInicalLocal);
                const fechaExpiracion = new Date(fechaExpiracionLocal);
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