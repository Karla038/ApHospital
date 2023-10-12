const Especialidad = require('../models/Especialidad');
const {response} = require('express');




const obtenerEspecialidades = async(req,res = response ) =>{

    
    // Obtener todas las Especialidades
    let especialidades = [];
    try {
        especialidades = await Especialidad.find();
        console.log(especialidades)
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'No se pudo obtener especialidades'
            
        })
    }   

    return res.status(200).json({
        ok:true,
        msg:'Las especialidades se consultaron correctamente',
        data:especialidades
    })    
}

module.exports = {
    obtenerEspecialidades
}