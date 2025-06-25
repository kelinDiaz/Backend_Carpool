const bcryptjs = require('bcryptjs');

const usuarioService = require('../services/usuario.service');

const registrarUsuario = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      dni,
      correo,
      contrasena,
      role_id,
      fotoPerfil,
      fotoCarnet,
      vehiculo
    } = req.body;

    if (!nombre || !apellido || !dni || !correo || !contrasena || !role_id) {
      return res.status(400).json({ mensaje: 'Faltan campos obligatorios.' });
    }

    const usuarioExistente = await usuarioService.buscarUsuarioPorCorreo(correo);
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado.' });
    }
      
    

    const salt = await bcryptjs.genSalt(5);
    const contrasenaEncriptada = await bcryptjs.hash(contrasena, salt);



    const datosUsuario = {
      nombre,
      apellido,
      dni,
      correo,
      contrasena: contrasenaEncriptada,
      role_id,
      fotoPerfil,
      fotoCarnet
    };
    

    await usuarioService.crearUsuario(datosUsuario, vehiculo);

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al registrar el usuario.' });
  }
};


const inicioSesion = async (req, res) => {
   try{
    const{
        correo,
        contrasena

    } = req.body;

    if(!correo || !contrasena){
        return res.status(400).json({ mensaje: 'Faltan campos obligatorios.' });
    }

    const usuarioExistente = await usuarioService.buscarUsuarioPorCorreo(correo);
    if(!usuarioExistente){
      return res.status(400).json({ mensaje: 'Datos Incorrectos.' });
    }
    const resultado = await usuarioService.login(correo,contrasena);

    if(!resultado){
     return res.status(500).json({ mensaje: 'Datos incorrectos.' });
    }
     return res.status(201).json({ mensaje: 'Inicio Sesion.',
      usuario: {
        id: resultado.id,
        nombre: resultado.nombre,
        apellido: resultado.apellido,
        dni: resultado.dni,
        fotoPerfil: resultado.fotoPerfil,
        fotoCarnet: resultado.fotoCarnet
      } });
      

   } catch(error){
       console.error(error);
    res.status(500).json({ mensaje: 'Error al iniciar sesion.' });
   }
   
};

      


module.exports = {
  registrarUsuario, inicioSesion
};
