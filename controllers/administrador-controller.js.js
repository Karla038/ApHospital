const { response } = require("express");
const bcrypt = require('bcrypt');


const Especialidad = require("../models/Especialidad");
const User = require("../models/User");

const TIPOS_USUARIO = {
    ADMIN: 'ADMIN',
    DOCTOR: 'DOCTOR',
    ENFERMERA: 'ENFERMERA',
    PACIENTE: 'PACIENTE'
}


const agregarUsuarioNuevoAdminEmail = async (req, res) => {

    const { email, idUsuarioAdmin } = req.body;
    console.log(email,idUsuarioAdmin)

    let usuarioNuevo;
    let usuarioAdmin;
    try {

        usuarioNuevo = await User.findOne({ email });

        if (!usuarioNuevo) {
            return res.status(400).json({
                ok: false,
                msg: 'El email no existe'
            });
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'No se puede realizar el registro'
        })
    }

    try {

        usuarioAdmin = await User.findById(idUsuarioAdmin);

        if (!usuarioAdmin) {
            return res.status(400).json({
                ok: false,
                msg: 'El email no existe'
            });
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'No se puede realizar el registro'
        })
    }

    console.log(usuarioAdmin)

    if (usuarioAdmin.usuariosSuscripcion.length > usuarioAdmin.suscripcion.sizeUsers ) {
        return res.status(400).json({
            ok: false,
            msg: 'Ya excediste el numero de usuarios ha agregrar, actualiza tu membresia para seguir disfrutando'
        });
    }
    usuarioAdmin.usuariosSuscripcion.push(usuarioNuevo.id);
    await User.findOneAndUpdate({ _id: idUsuarioAdmin }, usuarioAdmin);

    return res.status(201).json({
        ok: true,
        data:usuarioAdmin,
        msg: 'El usuario se agregó con exito',
    });
}



const agregarUsuarioNuevoAdmin = async (req, res = response) => {


    const { email, password, especialidad, role, idUsuarioAdmin } = req.body;
    console.log("agregarUsuarioNuevoAdmin")

    try {

        let usuarioAdmin = await User.findById(idUsuarioAdmin);

        if (!usuarioAdmin) {

            return res.status(400).json({
                ok: false,
                msg: 'El usuario del administrador no existe'
            });
        }
        if (usuarioAdmin.usuariosSuscripcion.length > usuarioAdmin.suscripcion.sizeUsers ) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya excediste el numero de usuarios ha agregrar, actualiza tu membresia para seguir disfrutando'
            });
        }


        let usuario = await User.findOne({ email });
        console.log(usuario);

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Correo electronico ya existe en CITAVITA'
            });
        }

        // Validando
        // se verifica si el usuario es doctor y validar que el id
        // exista

        console.log("DOCTOR")

        if (role === TIPOS_USUARIO.DOCTOR) {
            // Verificando el id realmente exista
            console.log("DOCTOR 2")

            const especialidadId = await Especialidad.findById(especialidad);
            console.log("DOCTOR 3")
            if (!especialidadId) {
                return res.status(404).json({
                    ok: false,
                    msg: 'La especialidad no existe'
                })
            }
        }
        usuario = new User(req.body);
        console.log(usuario)
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = await bcrypt.hashSync(password, salt);

        const usuarioNuevo = await usuario.save();

        console.log("usuarioNuevo")
        console.log(usuarioNuevo)


        usuarioAdmin.usuariosSuscripcion.push(usuarioNuevo.id);
        console.log(usuarioAdmin)
        await User.findOneAndUpdate({ _id: idUsuarioAdmin }, usuarioAdmin);

        return res.status(201).json({
            ok: true,
            msg: 'El usuario se creo con exito',
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'No se puede realizar el registro'
        })
    }

}

const obtenerTodosLosUsuarios = async (req, res) => {


    try {
        const idUsuarioAdmin = req.params.idUsuarioAdmin;
        console.log(idUsuarioAdmin)
        // Encuentra al usuario administrador
        const usuarioAdmin = await User.findById(idUsuarioAdmin)
            .populate({
                path: 'usuariosSuscripcion',
                model: 'User',
                select: '_id name email role',
                populate: {
                    path: 'especialidad',
                    model: 'Especialidade',
                    select: '_id name'
                }
            });


        return res.status(200).json({
            data: usuarioAdmin,
            ok: true,
            msg: 'Los usuarios se encontrarón correctamente',

        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'No se puede obtener los usuarios'
        });
    }


}

const actualizarUsuario = async(req, res) =>{
    const {idUsuarioAdmin,idUsuario,role,idEspecialidad} = req.body;

    try {

        usuario = await User.findById(idUsuario);

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'No se puede realizar el registro'
        })
    }
    usuario.role = role;

    if(usuario.role === TIPOS_USUARIO.ENFERMERA){
        usuario.especialidad = null;
    }

    if (usuario.role === TIPOS_USUARIO.DOCTOR) {
        // Verificando el id realmente exista
        console.log("DOCTOR 2")

        const especialidadId = await Especialidad.findById(idEspecialidad);
        usuario.especialidadId = especialidadId;
        console.log("DOCTOR 3")
        if (!especialidadId) {
            return res.status(404).json({
                ok: false,
                msg: 'La especialidad no existe'
            })
        }
    }
    console.log(usuario)


    await User.findOneAndUpdate({ _id: idUsuario }, usuario);

    return res.status(200).json({
        ok: true,
        msg: 'Se actualizó correctaments'
    });
    

}

const eliminarUsuario = async (req, res) => {

    const { idUsuarioAdmin, idUsuario } = req.body;

    let usuarioAdmin;
    let usuario;

    try {

        usuarioAdmin = await User.findById(idUsuarioAdmin);

        if (!usuarioAdmin) {
            res.status(404).json({
                ok: false,
                msg: 'No se encontró el usuario administrador'
            });
        }

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'No se puede eliminar el usuario administrador'
        });

    }

    try {

        usuario = await User.findById(idUsuario);

        if (!usuario) {
            res.status(404).json({
                ok: false,
                msg: 'No se encontró el usuario'
            });
        }

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'No se puede eliminar el usuario'
        });

    }

    console.log(usuarioAdmin)
    usuarioAdmin.usuariosSuscripcion = usuarioAdmin.usuariosSuscripcion.filter((user) => user.toString() !== idUsuario);
    console.log(usuarioAdmin);

    const actualizacion = {
        $set: {
            usuariosSuscripcion: usuarioAdmin.usuariosSuscripcion,
        },
    };
    usuarioAdmin = await User.findOneAndUpdate({ _id: idUsuarioAdmin }, actualizacion);

    return res.status(200).json({
        ok: true,
        msg: 'Se elimino correctamente'
    });

}


module.exports = {
    actualizarUsuario,
    agregarUsuarioNuevoAdminEmail,
    agregarUsuarioNuevoAdmin,
    obtenerTodosLosUsuarios,
    eliminarUsuario
}