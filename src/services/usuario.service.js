

const Usuario = require('../models/usuario.model');
const Vehiculo = require('../models/vehiculo.model');

const crearUsuario = async (datosUsuario, datosVehiculo) => {
  const nuevoUsuario = await Usuario.create(datosUsuario);

  if (datosUsuario.role_id === 2 && datosVehiculo) {
    await Vehiculo.create({
      usuario_id: nuevoUsuario.id,
      ...datosVehiculo
    });
  }

  return nuevoUsuario;
};

const buscarUsuarioPorCorreo = async (correo) => {
  return await Usuario.findOne({ where: { correo } });
};

const login = async (correo, contrasena) => {
  try {
    const result = await Usuario.findOne({
      where: {
        correo,
        contrasena
      }
    });

    return result; // será `null` si no encuentra nada
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
};

module.exports = {
  crearUsuario,
  buscarUsuarioPorCorreo,
  login
};


