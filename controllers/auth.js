// Importar la libreria de express a este archivo para obtener la ayuda 
const {response} = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generarJWT } = require('../helpers/jwt')


const crearUsuario = async(req, res = response) => {


    const { email, password} = req.body;

    try {

        let usuario = await User.findOne({email});
        console.log(usuario);

        if( usuario ){
            return res.status(400).json({
                ok:false,
                msg: 'Correo electronico ya existe'
            });
        }


        usuario = new User(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = await bcrypt.hashSync( password, salt);

        await usuario.save();

        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.name);

        res.status(201).json({
            ok:true,
            uid: usuario.id,
            name: usuario.name,
            token,
            role
        })
    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'No se puede realizar el registro'
        })
    }
    
}

const loginUsuario = async(req, res = response) => {

    const { email, password} = req.body;

    try {
        // const userDB = User.findOne({email});
        // if(userDB == null){
        //     return res.status(404).json({
        //         ok:false,
        //         msg:"El usuario no existe"
        //     })
        // }
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