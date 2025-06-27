

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

        const dniExistente = await usuarioService.buscarDNI(dni);
    if (dniExistente) {
      return res.status(400).json({ mensaje: 'El DNI ya está registrado.' });
    }

        if (role_id == 2 && !vehiculo){
          return res.status(400).json({ mensaje: 'Los conductores deben registrar un vehículo.' });

        }
      


    


    const usuarioExistente = await usuarioService.buscarUsuarioPorCorreo(correo);
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado.' });
    }

     
    
    const datosUsuario = {
      nombre,
      apellido,
      dni,
      correo,
      contrasena,
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

    const resultado = await usuarioService.login(correo,contrasena);

    if(!resultado){
      res.status(500).json({ mensaje: 'Datos incorrectos.' });
    }
      res.status(201).json({ mensaje: 'Inicio correcto.' });

   } catch(error){
       console.error(error);
    res.status(500).json({ mensaje: 'Error al iniciar sesion.' });
   }
   
};

      


module.exports = {
  registrarUsuario, inicioSesion
};
