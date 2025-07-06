


const {Viaje, Usuario, Rol} = require('../models');




const publicarViaje = async (viajeData) => {
  const { conductor_id } = viajeData;

  // Verificar que el usuario sea conductor
  const conductor = await Usuario.findByPk(conductor_id, {
    include: [{ model: Rol }]
  });

  if (!conductor) {
    throw new Error('El conductor no existe');
  }

  if (conductor.Rol.nombre !== 'conductor') {
    throw new Error('El usuario no tiene permisos para publicar un viaje');
  }

  // Crear el viaje
  const nuevoViaje = await Viaje.create(viajeData);
  return nuevoViaje;
};

const listarViajes = async () => {
  const viajes = await Viaje.findAll({
    include: [{
      model: Usuario,
      as: 'Usuario',
      attributes: ['id', 'nombre', 'apellido'],
      include: [{ model: Rol, attributes: ['nombre'] }]
    }]
  });

  return viajes;
};

const obtenerViajesPorConductor = async (conductor_id) => {
  const viajes = await Viaje.findAll({
    where: { conductor_id },
    include: [{
      model: Usuario,
      as: 'Usuario',
      attributes: ['id', 'nombre', 'apellido']
    }]
  });

  return viajes;
};

module.exports = {
  publicarViaje,
  listarViajes,
  obtenerViajesPorConductor
};
