const { response, json } = require('express');
const Diagnostico = require('../models/Diagnostico') ;
const Usuario  = require('../models/User');
const Paciente = require('../models/Paciente');

const getTodo = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    // Constante para expresiones regulares y se hagan busquedas insensibles
    const regex = new RegExp( busqueda, 'i');

    const pacientes = await Paciente.find({
        $or: [
            { name: regex },
            { fatherLastname: regex },
            { motherLastname: regex }
        ]
    });

    const [ busquedaDocPac, busquedaAdmin] = await Promise.all([
        Diagnostico.find({ resultadoDiagnostico: regex }),
        // Paciente.find({datosPacientes}),
        Usuario.find({name:regex})
    ]);


    res.json({
        ok:true,
        msg: 'getTodo',
        busquedaAdmin,
        busquedaDocPac,
        pacientes,
    })
}

const getDocumentosColeccion = async(req, res = response) => {

    const tabla    = req.params.tabla;
    const busqueda = req.params.busqueda;
    // Constante para expresiones regulares y se hagan busquedas insensibles
    const regex    = new RegExp( busqueda, 'i');

    let data = [];

    switch (tabla) {
        case 'pacientes':
             data = await Paciente.find({
                $or: [
                    { name: regex },
                    { fatherLastname: regex },
                    { motherLastname: regex }
                ]
            });

            break;

        case 'diagnosticos':
             data = await Diagnostico.find({ resultadoDiagnostico: regex });
           
            break;

        case 'usuarios':
             data = await Usuario.find({name:regex});
            break;
        default:
           res.status(400).json({
            ok: false,
            msg:'Error en la peticion'
           })

          
    }

   
    res.json({
        ok: true,
        resultados: data
        })
}


module.exports = {
    getTodo,
    getDocumentosColeccion 
}