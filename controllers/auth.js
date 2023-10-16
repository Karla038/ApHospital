// Importar la libreria de express a este archivo para obtener la ayuda 
const {response} = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generarJWT } = require('../helpers/jwt');
const Especialidad = require('../models/Especialidad');
const { getMenuFrontEnd } = require('../helpers/menu-frontend');


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
            const especialidadId = await Especialidad.findById(especialidad);

            if(!especialidadId){
                return res.status(404).json({
                   ok:false,
                    msg:'La especialidad no existe'
                })
            }   
        }     
   

        usuario = new User(req.body);

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
            data:token,
            menu:getMenuFrontEnd(role)
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


        return res.status(201).json({
            ok:true,
            msg:'Se inicio sesion correctamente',
            data:token,
            menu:getMenuFrontEnd(usuario.role)
        })                                                                                                   

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Correo electronico o cantraseña incorrectos'
        })
    }

}

const obtenerUsuarioId = async (req,res =response) =>{
    const id = req.params.id;

    if(id === null){
        return res.status(400).json({
            ok:false,
            msg:'Ubo un error inesperado',
            data:null
        });
    }

    try {
        let usuario = await User.findById(id);
    
        if(!usuario){
            return res.status(404).json({
                ok:false,
                msg:'El usuario no existe',
                data:null
            });
        }
        return res.status(200).json({
            ok:false,
            msg:'El usuario existe correctamente',
            data:usuario
        });
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Hubo un error inesperado'
        })
    }


}


const busquedaDoctor = async (req, res = response) => {
    
    const doctor = req.params.role;

        if( !doctor ){
            return res.status(400).json({
                ok:false,
                msg:'El usuario consultado no es doctor'
            })
        }

        // if(role === TIPOS_USUARIO.DOCTOR){
        //     return res.status(201).json({
        //         ok:true,
        //         msg:"Es doctor",  
        //     })
        // }
    
    try {
        
        let doctores = await User.find({ role:doctor }).populate('especialidad','name');


        return res.status(200).json({
            ok:true,
            msg:'Los usuarios son doctores',
            data:doctores
        });
        
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Los usuarios no son doctores'
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
    obtenerUsuarioId,
    busquedaDoctor,
    crearUsuario,
    loginUsuario, 
    revalidarToken
}