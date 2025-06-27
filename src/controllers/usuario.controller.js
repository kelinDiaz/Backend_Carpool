

const bcryptjs = require('bcryptjs');
const usuarioService = require('../services/usuario.service');

const registrarUsuario = async (req, res) => {
  try {
    console.log(' Datos recibidos:', req.body);

    const {
      nombre,
      apellido,
      dni,
      correo,
      contrasena,
      role_id,
      fotoPerfil,
      fotoCarnet,
      telefono, 
      vehiculo
    } = req.body;

    if (!nombre || !apellido || !dni || !correo || !contrasena || !role_id || !telefono) {
      return res.status(400).json({ mensaje: 'Faltan campos obligatorios.' });
    }

    const dniExistente = await usuarioService.buscarDNI(dni);
    if (dniExistente) {
      return res.status(400).json({ mensaje: 'El DNI ya está registrado.' });
    }

    if (role_id == 2 && !vehiculo) {
      return res.status(400).json({ mensaje: 'Los conductores deben registrar un vehículo.' });
    }

    if (role_id == 2 && vehiculo) {
      const placaExistente = await usuarioService.buscarPlaca(vehiculo.placa);
      if (placaExistente) {
        return res.status(400).json({ mensaje: 'La placa ya esta registrada.' });
      }
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
      fotoCarnet,
      telefono 
    };

    const nuevoUsuario = await usuarioService.crearUsuario(datosUsuario, vehiculo);

    console.log(' Usuario registrado exitosamente:', nuevoUsuario);

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente.' });

  } catch (error) {
    console.error('Error en registrarUsuario:', error);
    res.status(500).json({ mensaje: 'Error al registrar el usuario.' });
  }
};

const inicioSesion = async (req, res) => {
  try {
    console.log('Datos recibidos para login:', req.body);

    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
      return res.status(400).json({ mensaje: 'Faltan campos obligatorios.' });
    }

    const usuarioExistente = await usuarioService.buscarUsuarioPorCorreo(correo);
    if (!usuarioExistente) {
      return res.status(400).json({ mensaje: 'Datos incorrectos.' });
    }

    const resultado = await usuarioService.login(correo, contrasena);

    if (!resultado) {
      return res.status(400).json({ mensaje: 'Datos incorrectos.' });
    }

    console.log(' Inicio de sesión exitoso:', resultado);

    return res.status(201).json({
      mensaje: 'Inicio Sesion.',
      usuario: resultado
    });

  } catch (error) {
    console.error(' Error en inicioSesion:', error);
    res.status(500).json({ mensaje: 'Error al iniciar sesión.' });
  }
};

module.exports = {
  registrarUsuario,
  inicioSesion
};
