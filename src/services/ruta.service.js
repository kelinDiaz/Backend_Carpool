

const Ruta = require('../models/ruta.model');
const Usuario = require('../models/usuario.model');
const Campus = require('../models/campus.model');


const crearRuta = async ({ usuario_id, direccion_casa }) => {
  // Verificar si ya tiene ruta
  const rutaExistente = await Ruta.findOne({ where: { usuario_id } });
  if (rutaExistente) {
    throw new Error('El usuario ya tiene una ruta asignada');
  }

  // Obtener campus_id del usuario
  const usuario = await Usuario.findByPk(usuario_id);
  if (!usuario) {
    throw new Error('Usuario no encontrado');
  }

  // Obtener dirección del campus
  const campus = await Campus.findByPk(usuario.campus_id);
  if (!campus) {
    throw new Error('Campus no encontrado para el usuario');
  }

  // Crear ruta con la direccion del campus, fecha actual y Solicitud_cambio_ruta null
  const nuevaRuta = await Ruta.create({
    usuario_id,
    direccion_casa,
    direccion_campus: campus.direccion,
    fecha_ultima_ubicacion: new Date(),
    Solicitud_cambio_ruta: null
  });

  return nuevaRuta;
};

module.exports = {
  crearRuta,
};