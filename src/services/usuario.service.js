

const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario.model');
const Vehiculo = require('../models/vehiculo.model');

const crearUsuario = async (datosUsuario, datosVehiculo) => {
  try {
    const nuevoUsuario = await Usuario.create(datosUsuario);
    console.log(' Usuario creado:', nuevoUsuario);

    if (datosVehiculo) {
      await Vehiculo.create({
        usuario_id: nuevoUsuario.id,
        ...datosVehiculo
      });
      console.log('Vehículo creado:', datosVehiculo);
    }

    return nuevoUsuario;

  } catch (error) {
    console.error(' Error en crearUsuario:', error);
    throw error;
  }
};

const buscarDNI = async (dni) => {
  try {
    const usuario = await Usuario.findOne({ where: { dni } });
    console.log('🔍 Resultado buscarDNI:', usuario);
    return usuario;
  } catch (error) {
    console.error('Error en buscarDNI:', error);
    throw error;
  }
};

const buscarPlaca = async (placa) => {
  try {
    const vehiculo = await Vehiculo.findOne({ where: { placa } });
    console.log('🔍 Resultado buscarPlaca:', vehiculo);
    return vehiculo;
  } catch (error) {
    console.error(' Error en buscarPlaca:', error);
    throw error;
  }
};

const buscarUsuarioPorCorreo = async (correo) => {
  try {
    const usuario = await Usuario.findOne({
      where: { correo },
      attributes: ['id', 'nombre', 'apellido', 'dni', 'fotoPerfil', 'fotoCarnet', 'contrasena', 'telefono']
    });
    console.log('🔍 Resultado buscarUsuarioPorCorreo:', usuario);
    return usuario;
  } catch (error) {
    console.error('Error en buscarUsuarioPorCorreo:', error);
    throw error;
  }
};

const login = async (correo, contrasena) => {
  try {
    const usuarioVerificar = await buscarUsuarioPorCorreo(correo);

    if (!usuarioVerificar) {
      console.log(' Usuario no encontrado en login');
      return null;
    }

    const compararContra = await bcryptjs.compare(contrasena, usuarioVerificar.contrasena);

    if (compararContra) {
      return {
        id: usuarioVerificar.id,
        nombre: usuarioVerificar.nombre,
        apellido: usuarioVerificar.apellido,
        dni: usuarioVerificar.dni,
        fotoPerfil: usuarioVerificar.fotoPerfil,
        fotoCarnet: usuarioVerificar.fotoCarnet,
        telefono: usuarioVerificar.telefono // 👈 Agregado en la respuesta
      };
    } else {
      console.log('Contraseña incorrecta');
      return null;
    }

  } catch (error) {
    console.error(' Error en login:', error);
    throw error;
  }
};

module.exports = {
  crearUsuario,
  buscarUsuarioPorCorreo,
  login,
  buscarDNI,
  buscarPlaca
};
