const { response } = require("express");
const webpush = require('web-push');
const Token = require("../models/Token");



const savePush = async(req, res = response) =>{

    try{
        console.log('save push')
        console.log('req.body ', req.body)
        const token = new Token(req.body);
        
        await token.save();


        return res.status(201).json({
            ok: true,
            msg: 'El token fue guardado correctamente'
        });
    }catch(error){
        return res.status(500).json({
            ok: false,
            msg: 'No se puedo guardar el token'
        })
    }
}


const sendPush = async(req, res = response) =>{
    console.log('sendPush')
    try{
    
        const payload = {
            "notification":{
                "title": "Bienvenido",
                "body": "inicio de sesion correctamente",
                "vibrate": [100,50,100],
                "image":"",
                "actions":[
                    {
                        "action":"explore",
                        "title":"cerrar"
                    }
                ]
            }
        }

        const unique = req.body;
        
        console.log('json unique',unique);

        console.log('obtener token base de datos')
        const token = await Token.findOne({"keys.p256dh":unique.keys.p256dh});
        console.log('token base de datos', token)
        await webpush.sendNotification(token,JSON.stringify(payload))
               .then((res)=>{
                console.log('Enviado !!', res);
               }).catch(err => {
                console.log('Error', err);
        })

        console.log('Se envio la notificación')
        return res.status(200)
                .json({ ok: true, msg: 'Se envio la notificación!!' })

        
    }catch(error){
        console.error(error)
        return res.status(500).json({
            ok: false,
            msg: 'No se pudo enviar el token'
        })
    }
}

module.exports = {
    savePush, sendPush
}
