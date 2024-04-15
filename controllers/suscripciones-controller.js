const { response } = require("express");

const Suscripcion = require('../models/Suscripcion');


const obtenerSuscripciones = async(req,res = response) => {
    let suscripciones = [];
    try {
        suscripciones = await Suscripcion.find();
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'No se pudo obtener especialidades'
        })
    }   

    return res.status(200).json({
        ok:true,
        msg:'Las suscripciones se consultaron correctamente',
        data:suscripciones
    }).end();

}


module.exports =  {
    obtenerSuscripciones
}