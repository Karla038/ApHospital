const { response } = require("express");
const Suscripcion = require("../models/Suscripcion");
const User = require("../models/User");




const generarSuscripcion = async(req,res = response) =>{

    const {email,idSuscripcion} = req.body;
    
    let suscripcion;
    let usuario;

    try{
        usuario = User.findByOne({email});
    }catch(error){
        console.log(error);
    }

    if(usuario.suscripcion){
        res.status(200).json({
            ok:true,
            msg: 'Ya cuentas con una suscripción'
        });
    }

    try {    
        suscripcion = await Suscripcion.findById(idSuscripcion);
    } catch (error) {
        console.log(error);
    }


}

module.exports = {
    generarSuscripcion
}