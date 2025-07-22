const { Reserva, Usuario, Viaje } = require('../models');




const crearReserva = async (pasajero_id, viaje_id, mensaje) => {

  const existe = await Reserva.findOne({
    where: { pasajero_id, viaje_id }
  });

  if (existe) {
    throw new Error('Ya has enviado una solicitud para este viaje');
  }

  return await Reserva.create({ pasajero_id, viaje_id, mensaje });
};


const responderReserva = async (id, estado) => {
  const reserva = await Reserva.findByPk(id);
  if (!reserva) throw new Error('Reserva no encontrada');
  reserva.estado = estado;
  await reserva.save();
  return reserva;
};

const obtenerReservasPorConductor = async (conductorId) => {
  return await Reserva.findAll({
    include: [{
      model: Viaje,
      where: { conductor_id: conductorId }
    }, {
      model: Usuario, // Pasajero
      attributes: ['id', 'nombre', 'apellido', 'fotoPerfil']
    }]
  });
};

const obtenerReservasPorPasajero = async (pasajeroId) => {
  return await Reserva.findAll({
    where: { pasajero_id: pasajeroId },
    include: [{
      model: Viaje,
      include: [{
        model: Usuario,
        attributes: ['id', 'nombre', 'apellido']
      }]
    }]
  });
};

module.exports = {
  crearReserva,
  responderReserva,
  obtenerReservasPorConductor,
  obtenerReservasPorPasajero
};
