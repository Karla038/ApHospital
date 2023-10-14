const Especialidad = require('../models/Especialidad');
const {response} = require('express');


const guardarEspecialidad = async(req, res = response) => {

    try {

        const { name } = req.body;

        let nuevaEspecialidad;
        let especialidadGuardada;

        nuevaEspecialidad = await especialidad.findOne({ name });

        if( nuevaEspecialidad ){
            return res.status(400).json({
                ok:false,
                msg: 'La especialidad ya existe'
            })
        }

        nuevaEspecialidad = new especialidad(req.body);

        await nuevaEspecialidad.save(especialidadGuardada);

        return req.status(201).json({
            ok: true,
            msg: 'Se registro la especialidad'
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'No se puede realizar el registro'
        })  
    }
    
    return res.status(201).json({
        ok:true,
        msg: 'Se registraron los datos'
    })
}



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
    guardarEspecialidad,
    obtenerEspecialidades
}