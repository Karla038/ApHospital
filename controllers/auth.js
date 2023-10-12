// Importar la libreria de express a este archivo para obtener la ayuda 
const {response} = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generarJWT } = require('../helpers/jwt');
const Especialidad = require('../models/Especialidad');


// Evitar los magic string,
// se crea un objeto con los tipos de usuario
// con su valor 
const TIPOS_USUARIO = {
    DOCTOR:'DOCTOR',
    ENFERMERA:'ENFERMERA'
}


const crearUsuario = async(req, res = response) => {


    const { email, password,especialidad,role} = req.body;

    try {

        let usuario = await User.findOne({email});
        console.log(usuario);

        if( usuario ){
            return res.status(400).json({
                ok:false,
                msg: 'Correo electronico ya existe'
            });
        }

        // Validanfo
        // se verifica si el usuario es doctor y validar que el id
        // exista
        if(role === TIPOS_USUARIO.DOCTOR){
            // Verificando el id realmente exista
            const especialidad = await Especialidad.findById(especialidad);

            if(!especialidad){
                return res.status(404).json({
                   ok:false,
                    msg:'La especialidad no existe'
                })
            }   
        }     
        console.log(req.body)
        console.log('Contrui');
   

        usuario = new User(req.body);

        console.log(usuario);
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = await bcrypt.hashSync( password, salt);
        console.log('Contrui3');

        await usuario.save();

        console.log('Contrui4');


        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.name);
        console.log(token)
        return res.status(201).json({
            ok:true,
            msg:'El usuario se creo con exito',
            data:token
        })
    }catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'No se puede realizar el registro'
        })
    }
    
}

const loginUsuario = async(req, res = response) => {

    const { email, password} = req.body;

    try {       
        const usuario = await User.findOne({email});
        console.log(usuario);

        if( !usuario ){
            return res.status(400).json({
                ok:false,
                msg: 'Correo electronico o cantraseña incorrectos'
            });
        }

        // Confirmar contraseñas
        const validarContraseña = await bcrypt.compareSync( password, usuario.password);

        if( !validarContraseña ){
            return res.status(400).json({
                ok:false,
                msg:'Contraseña invalida'
            });
        }


        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.name);


        res.status(201).json({
            ok:true,
            uid: usuario.id,
            name: usuario.name,
            token
        })                                                                                                   

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Correo electronico o cantraseña incorrectos'
        })
    }

}

const revalidarToken = async (req, res = response) => {
    
    const token = await generarJWT( req.uid, req.name);

    res.json({
        ok:true,
        token
    })
}


module.exports = {
    crearUsuario,
    loginUsuario, 
    revalidarToken
}