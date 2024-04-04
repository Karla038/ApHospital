const { response } = require('express');
const doctor = require('../models/Doctor');

const crearDoctor = async(req, res=response) => {

    const { email } = req.body;

    try {
        
        let nuevoDoctor;
        let doctorGuardado;

        nuevoDoctor = await doctor.findOne({ email })

        if( nuevoDoctor ){
            return res.status(400).json({
                ok:false,
                msg: 'Correo electronico ya existe'
            });
        }

        nuevoDoctor = new doctor(req.body);

        await nuevoDoctor.save(doctorGuardado);
        
        return res.status(201).json({
            ok:true,
            msg: 'Se registro a el doctor correctamente'
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

module.exports = {
    crearDoctor
}