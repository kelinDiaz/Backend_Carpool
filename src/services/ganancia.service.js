
const { Viaje, ViajePasajero, Ganancia } = require('../models');

const registrarGananciaPorViaje = async (viajeId) => {
  const viaje = await Viaje.findByPk(viajeId);

  if (!viaje) {
    throw new Error('Viaje no encontrado');
  }

  const pasajeros = await ViajePasajero.count({ where: { viaje_id: viajeId } });
  const precio = parseFloat(viaje.precio_asiento);
  const ganancia = pasajeros * precio;

  // Evita duplicar si ya existe
  const existente = await Ganancia.findOne({ where: { viaje_id: viajeId } });
  if (existente) {
    throw new Error('Ganancia ya registrada para este viaje');
  }

  const nuevaGanancia = await Ganancia.create({
    conductor_id: viaje.conductor_id,
    viaje_id: viaje.id,
    pasajeros,
    precio_asiento: precio,
    ganancia_total: ganancia
  });

  return nuevaGanancia;
};

const obtenerGananciaPorViaje = async (viajeId) => {
  const ganancia = await Ganancia.findOne({
    where: { viaje_id: viajeId },
    attributes: ['ganancia_total', 'pasajeros', 'precio_asiento']
  });

  if (!ganancia) throw new Error('Ganancia no registrada');

  return ganancia;
};

module.exports = {
  registrarGananciaPorViaje,
  obtenerGananciaPorViaje
};
