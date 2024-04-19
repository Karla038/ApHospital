// Importar la libreria de express a este archivo para obtener la ayuda 
const {response} = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User.js');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const Especialidad = require('../models/Especialidad');
const { getMenuFrontEnd } = require('../helpers/menu-frontend');
const Suscripcion = require('../models/Suscripcion');
const  { generarToken }  = require('../helpers/generarId');
const { emailOlvidePassword } = require('../helpers/cuerpoEmail');
const speakeasy = require('speakeasy');
const { enviarDobleAuthenticacion } =  require('../helpers/doble-authenticacion');



// Evitar los magic string,
// se crea un objeto con los tipos de usuario
// con su valor 
const TIPOS_USUARIO = {
    ADMIN: 'ADMIN',
    DOCTOR:'DOCTOR',
    ENFERMERA:'ENFERMERA',
    PACIENTE: 'PACIENTE'
}



const crearUsuario = async(req, res = response) => {


    const { email, password,idEspecialidad,role, idSuscripcion} = req.body;

    console.log(idSuscripcion)
    try {

        let usuario = await User.findOne({email});
        console.log(usuario);

        if( usuario ){
            return res.status(400).json({
                ok:false,
                msg: 'Correo electronico ya existe'
            });
        }

        // Validando
        // se verifica si el usuario es doctor y validar que el id
        // exista
        if(role === TIPOS_USUARIO.DOCTOR){
            // Verificando el id realmente exista
            const especialidad = await Especialidad.findById(idEspecialidad);

            if(!especialidad){
                return res.status(404).json({
                   ok:false,
                    msg:'La especialidad no existe'
                })
            }   
        }
        usuario = new User(req.body);
        
        let suscripcion = null;
        if(role === TIPOS_USUARIO.ADMIN){
            suscripcion = await Suscripcion.findById(idSuscripcion);
            if(!suscripcion){
                return res.status(404).json({
                    ok:false,
                    msg:'La suscripción no existe'
                })
            }
            usuario.suscripcion = suscripcion;
            usuario.suscripcion.dateSuscription = new Date();

        }

      
        console.log(usuario);
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = await bcrypt.hashSync( password, salt);

        await usuario.save();


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

const actualizarUsuario = async (req, res = response) => {

    const uid = req.params.id;    

    try {

        const usuarioDB = await User.findById( uid );

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            })
        }

        //Actualizaciones 

        const {password, google, email, ...campos} = req.body;

        if( usuarioDB.email !== email ){
            const existeEmail = await User.findOne({ email });

            if( existeEmail ){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con este email'
                })
            }
        }

        campos.email = email;


        const usuarioActualizado = await User.findByIdAndUpdate( uid, campos, { new: true });


        res.json({
            ok: true,
            usuario: usuarioActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const borrarUsuario = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await User.findById( uid );

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            })
        }

        await User.findByIdAndDelete( uid )

        res.status(400).json({
            ok:true,
            msg: 'Usuario elimindado correctamente'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        });
    }
}

const loginUsuario = async(req, res = response) => {

    const { email, password} = req.body;

    try {       
        console.log(email)
        const usuario = await User.findOne({email});
        console.log(usuario);

        if( !usuario ){
            return res.status(400).json({
                ok:false,
                msg: 'Correo electronico o contraseña incorrectos'
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

        console.log(
        "dobleAuthenticacion"
        )


        const dobleAuthenticacion  = speakeasy.generateSecret({length:5});
        usuario.authenticacionDoble = dobleAuthenticacion.base32;
        
        await usuario.save();
        enviarDobleAuthenticacion({
            email:usuario.email,
            name:usuario.name,
            authenticacionDoble:usuario.authenticacionDoble     
        })

        res.status(200).json({msg: 'Hemos enviado un email con tu codigo de verificacion',ok:true})

        // Generar JWT
        //const token = await generarJWT( usuario.id, usuario.name);


        //return res.status(201).json({
        //    ok:true,
        //    msg:'Se inicio sesion correctamente',
        //    data:token,
        //    menu:getMenuFrontEnd(usuario.role)
        //})                                                                                                   

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Correo electronico o cantraseña incorrectos'
        })
    }

}

const comprobarDobleAuthenticacion = async(req, res = response) => {
    const { email, authenticacionDoble } = req.body;
   
    console.log(req.body)
    console.log(email)
    console.log("comprobarDobleAuthenticacion")
        
        try {

            const usuarioDB = await User.findOne({email});        
            console.log('Aparece eso o no ' + usuarioDB);

            if(!usuarioDB){
                return res.status(403).json({
                    ok:false,
                    msg:'No existe este usuario'
                })
            }

    
            if(authenticacionDoble !== usuarioDB.authenticacionDoble){
                return res.status(400).json({
                    ok:false,
                    msg:'El codigo de verificacion es incorrecto'
                })
            }                  
    
            const token = await generarJWT(usuarioDB.id,usuarioDB.name);
            console.log("token expiracion")
            console.log(token.exp)
            res.json({
                ok:true,
                msg:token,
                menu: getMenuFrontEnd (usuarioDB.role)
            });
           
            
        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok:true,
                msg:""
            })
        }
    }


const googleSignIn = async(req, res = response) => {

    try {

        const { email, name, picture } = await googleVerify(req.body.token);

        const usuarioDB = await User.findOne({ email });
        let usuario;

        if ( !usuarioDB ){
            usuario = new  User({
                nombre: name, 
                email: email, 
                password: '@@@',
                img: picture,
                google: true
            })
        }else {
            usuario = usuarioDB;
            usuario.google = true 
        }

        //Guardar usuario 
        await usuario.save();

        // Generar JWT
        const token = await generarJWT( usuario.id );

        res.json({
            ok:true,
            email, name, picture,
            token
        })

        
    } catch (error) {

        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'ELtoken de google no es correcto'
        })
    }


    
}

const obtenerUsuarioId = async (req,res =response) =>{
    const id = req.params.id;

    if(id === null){
        return res.status(400).json({
            ok:false,
            msg:'Hubo un error inesperado',
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

const confirmar = async (req, res = response) => {
    const { tokenDoble } = req.params;
    console.log("Primer log"+tokenDoble);

    const usuarioConfirmado = await User.findOne({ tokenDoble });

    console.log("Primer log"+usuarioConfirmado);

    if(!usuarioConfirmado || usuarioConfirmado === null ) {
        return res.status(404).json({
            msg: "El token es invalido",
            ok :false
        })
    }

    try {
        usuarioConfirmado.confirmado = true;
        usuarioConfirmado.tokenDoble = '';

        await usuarioConfirmado.save();
        res.json({
            ok:true,
            msg: 'Usuario confirmado correctamente'
        })
    } catch (error) {
        console.log(error);
    }
}

const olvidePassword = async (req, res=response) => {
    const {email} = req.body;
    console.log(email);
    const usuario = await User.findOne({email});
    console.log(usuario);

    if(!usuario || usuario === null){
        res.json({
            msg:"El usuario no existe",
            ok:false
        })
    }

    try {

        // Generar el token

        usuario.tokenDoble = ''

        usuario.tokenDoble = generarToken.generarIdMetodo();
        await usuario.save();

        emailOlvidePassword({
            email: usuario.email,
            name: usuario.name,
            token: usuario.tokenDoble
        })

        res.json({
            msg:'Hemos enviado un email con las instrucciones',

        })
        
    } catch (error) {
        console.log(error)    
    }
}

const nuevoPassword = async (req, res=response) =>{
    const {tokenDoble} = req.params;
    const {password} = req.body;

    console.log( "Password" + password );
    console.log( "TokenDoble" + tokenDoble );

    const usuario = await User.findOne({tokenDoble});

    console.log(usuario)

    if(!usuario){
        res.status(400).json({
            ok:false,
            msg:"Token invalido"
        })
    }

    try {
        
        const salt = bcrypt.genSaltSync();
        usuario.password = await bcrypt.hashSync(password, salt);
        usuario.tokenDoble = '';

        await usuario.save();

        res.json({
            msg: 'La contraseña se actualizo correctamente',
            ok:false
        })
    } catch (error) {
        console.log(error)
    }
}

const comprobarTokenValidacion = async(req, res=response) => {
    const {tokenDoble} = req.params;
    console.log(tokenDoble);

    const tokenValidar = await User.findOne({tokenDoble});

    if(!tokenValidar){
        res.status(400).json({
            msg:'Token no valido',
            ok:false
        })
    }
    if(tokenValidar){
        res.json({
            msg:'Token valido el usuario existe',
            ok:true
        })
    }
}




module.exports = {
    obtenerUsuarioId,
    busquedaDoctor,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario,
    loginUsuario, 
    revalidarToken,
    googleSignIn,
    confirmar,
    olvidePassword,
    nuevoPassword,
    comprobarTokenValidacion,
    comprobarDobleAuthenticacion
}