

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

module.exports = {
  crearUsuario,
  buscarUsuarioPorCorreo
};


