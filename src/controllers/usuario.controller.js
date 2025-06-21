

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

module.exports = {
  registrarUsuario
};
