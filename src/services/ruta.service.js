const Ruta = require('../models/ruta.model');
const Usuario = require('../models/usuario.model');
const Campus = require('../models/campus.model');

const crearRuta = async ({ usuario_id, direccion_casa }) => {

  const rutaExistente = await Ruta.findOne({ where: { usuario_id } });
  if (rutaExistente) {
    throw new Error('El conductor ya tiene una ruta asignada');
  }

  const usuario = await Usuario.findByPk(usuario_id, {
    include: [{ model: Campus, as: 'campus' }]
  });

  if (!usuario) {
    throw new Error('Usuario no encontrado');
  }

  if (!usuario.campus) {
    throw new Error('El usuario no tiene campus asignado');
  }

  // Creacion de la ruta con direccion_casa y la  direccion_campus obtenida
  const nuevaRuta = await Ruta.create({
    usuario_id,
    direccion_casa,
    direccion_campus: usuario.campus.direccion,
    fecha_ultima_ubicacion: new Date(),
    Solicitud_cambio_ruta: null
  });

  return nuevaRuta;
};

module.exports = {
  crearRuta
};
