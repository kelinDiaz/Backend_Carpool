
const viajePasajeroService = require('../services/viajePasajero.service');

const getViajeDetallePasajero = async (req, res) => {
  try {
    const idViaje = req.params.id;
    const viaje = await viajePasajeroService.obtenerDetalleViajeParaPasajero(idViaje);

    if (!viaje) {
      return res.status(404).json({ mensaje: 'Viaje no encontrado' });
    }

    return res.status(200).json({
      mensaje: 'Detalle del viaje obtenido correctamente',
      viaje
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error interno al obtener el detalle del viaje',
      error: error.message
    });
  }
};



const buscarViajesPorDestino = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: 'Debe proporcionar un término de búsqueda' });

    const viajes = await viajePasajeroService.buscarViajesPorDestino(q);
    res.json(viajes);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar viajes', detalle: error.message });
  }
};



const obtenerViajeDePasajero = async (req, res) => {
  try {
    const { pasajero_id } = req.params;

    const viaje = await viajePasajeroService.obtenerViajeAceptadoPorPasajero(pasajero_id);

    if (!viaje) {
      return res.status(404).json({ mensaje: 'No tienes un viaje aceptado actualmente' });
    }

    res.json(viaje);
  } catch (error) {
    console.error('Error al obtener viaje del pasajero:', error);
    res.status(500).json({ error: 'Error interno al obtener el viaje' });
  }
};

module.exports = {
  getViajeDetallePasajero, 
  buscarViajesPorDestino,
  obtenerViajeDePasajero
};