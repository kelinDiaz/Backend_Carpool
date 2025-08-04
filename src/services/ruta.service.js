

const Ruta = require('../models/ruta.model');
const Usuario = require('../models/usuario.model');
const Campus = require('../models/campusUniversitario.model');


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

const obtenerRutaPorUsuarioId = async (usuario_id) => {
  const ruta = await Ruta.findOne({ where: { usuario_id } });

  if (!ruta) {
    return null;
  }

  return ruta;
};






const editarRuta = async (rutaId, nuevaRuta) => {
  const ruta = await Ruta.findByPk(rutaId);
  
  if (!ruta) {
    throw new Error('Ruta no encontrada');
  }


  nuevaRuta.fecha_ultima_ubicacion = new Date();
  await ruta.update({
    direccion_casa: nuevaRuta.direccion_casa,
    latitud_casa: nuevaRuta.latitud_casa,
    longitud_casa: nuevaRuta.longitud_casa,
    direccion_campus: nuevaRuta.direccion_campus,
    latitud_campus: nuevaRuta.latitud_campus,
    longitud_campus: nuevaRuta.longitud_campus,
   
    solicitud_cambio_ruta: nuevaRuta.solicitud_cambio_ruta
  });

  return ruta;
};

module.exports = {
  crearRuta,
  obtenerRutaPorUsuarioId, 
  editarRuta
};