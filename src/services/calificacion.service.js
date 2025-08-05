

const { Calificacion } = require('../models');

const crearCalificacion = async ({ viaje_id, calificador_id, calificado_id, tipo, calificacion, comentario }) => {
  // Validar si ya existe una calificación para este viaje entre estos usuarios
  const existe = await Calificacion.findOne({
    where: {
      viaje_id,
      calificador_id,
      calificado_id,
      tipo
    }
  });

  if (existe) {
    throw new Error('Ya se ha enviado una calificación para este usuario en este viaje');
  }

  const nueva = await Calificacion.create({
    viaje_id,
    calificador_id,
    calificado_id,
    tipo,
    calificacion,
    comentario
  });

  return nueva;
};

const obtenerCalificacionesRecibidas = async (usuarioId, tipo) => {
  return await Calificacion.findAll({
    where: {
      calificado_id: usuarioId,
      tipo
    },
    order: [['fecha', 'DESC']]
  });
};

const obtenerPromedioUsuario = async (usuarioId, tipo) => {
  const { sequelize } = require('../config/database');
  const resultado = await Calificacion.findOne({
    where: { calificado_id: usuarioId, tipo },
    attributes: [[sequelize.fn('AVG', sequelize.col('calificacion')), 'promedio']]
  });
  return resultado?.get('promedio') || 0;
};


const obtenerCalificacionPorId = async (id) => {
  const calificacion = await Calificacion.findByPk(id, {
    attributes: ['calificacion', 'comentario']
  });

  if (!calificacion) {
    throw new Error('Calificación no encontrada');
  }

  return calificacion;
};




const verificarCalificacion = async (viajeId, calificadorId, calificadoId, tipo) => {
  try {

    const calificacion = await Calificacion.findOne({
      where: {
        viaje_id: viajeId,
        calificador_id: calificadorId,
        calificado_id: calificadoId,
        tipo: tipo
      }
    });

    
    if (calificacion) {
      return { existe: true, calificado: true };
    }

    return { existe: false, calificado: false };
  } catch (error) {
    console.error("Error al verificar la calificación:", error);
    throw new Error('Error al verificar la calificación');
  }
};


module.exports = {
  crearCalificacion,
  obtenerCalificacionesRecibidas,
  obtenerPromedioUsuario, 
  obtenerCalificacionPorId,
  verificarCalificacion
};
