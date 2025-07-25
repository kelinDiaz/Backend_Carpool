const { Reserva, Usuario, Viaje, ViajePasajero } = require('../models');




const crearReserva = async (pasajero_id, viaje_id, mensaje) => {

  const existe = await Reserva.findOne({
    where: { pasajero_id, viaje_id }
  });

  if (existe) {
    throw new Error('Ya has enviado una solicitud para este viaje');
  }

  return await Reserva.create({ pasajero_id, viaje_id, mensaje });
};



const procesarAceptacion = async (reserva) => {
  const viaje = await Viaje.findByPk(reserva.viaje_id);
  if (!viaje) throw new Error('Viaje no encontrado');

  console.log('Asientos disponibles antes:', viaje.asientos_disponibles);

  if (viaje.asientos_disponibles <= 0) {
    throw new Error('No hay asientos disponibles');
  }

  await ViajePasajero.create({
    viaje_id: reserva.viaje_id,
    pasajero_id: reserva.pasajero_id
  });

  viaje.asientos_disponibles -= 1;

  console.log('Asientos disponibles después:', viaje.asientos_disponibles);

  await viaje.save();
};



const responderReserva = async (id, estado) => {
  const reserva = await Reserva.findByPk(id);
  if (!reserva) throw new Error('Reserva no encontrada');

  if (estado === 'aceptada') {
    await procesarAceptacion(reserva);
  }

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
