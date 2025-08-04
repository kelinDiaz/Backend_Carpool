
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




const getMisViajesP = async (req, res) => {
  try {
    const { pasajero_id } = req.params;

    const viajes = await viajePasajeroService.getMisViajesP(pasajero_id);

    if (!viajes || viajes.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron viajes finalizados para este pasajero' });
    }

    return res.status(200).json({ viajes });
  } catch (error) {
    console.error('Error al obtener viajes finalizados del pasajero:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};



/*const obtenerEstadoViaje = async (req, res) => {
  const { pasajeroId } = req.params;

  try {
    const viaje = await viajePasajeroService.obtenerEstadoViajePorPasajero(pasajeroId);

    if (!viaje) {
      return res.status(200).json({ viaje: null });
    }

    return res.status(200).json({
      viaje: {
        id: viaje.id,
        estado: viaje.estado,  
        destino: viaje.destino,
  
      }
    });

  } catch (error) {
    console.error('Error al obtener estado del viaje:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};*/
const obtenerConductorPorViaje = async (req, res) => {
  try {
    const { viajeId } = req.params;
    const conductor = await viajePasajeroService.obtenerConductorPorViaje(viajeId);
    res.json(conductor);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};





async function getViajeFinalizado(req, res) {
  const pasajeroId = req.params.pasajero_id;  

  try {

    const viajeFinalizado = await viajePasajeroService.obtenerUltimoViajeFinalizado(pasajeroId);

    if (!viajeFinalizado) {
      return res.status(404).json({ mensaje: 'No tienes un viaje finalizado actualmente' });
    }

    return res.json({
      viaje: viajeFinalizado.viaje,  // Enviamos el viaje
      conductor: viajeFinalizado.conductor,  // Enviamos los detalles del conductor
    });
  } catch (error) {
    console.error('Error en getViajeFinalizado:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}



module.exports = {
  getViajeDetallePasajero, 
  buscarViajesPorDestino,
  obtenerViajeDePasajero, 
  getMisViajesP,
  obtenerConductorPorViaje, 
  getViajeFinalizado
 /* obtenerEstadoViaje*/
};