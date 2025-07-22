
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

module.exports = {
  getViajeDetallePasajero
};