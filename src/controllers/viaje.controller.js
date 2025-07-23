
const viajeService = require('../services/viaje.service');

const crearViaje = async (req, res) => {
  try {
    const viaje = await viajeService.crearViaje(req.body);
    res.status(201).json({ mensaje: 'Viaje creado correctamente', viaje });
  } catch (error) {
    console.error('Error al crear viaje:', error.message);
    res.status(400).json({ error: error.message });
  }
};

const getViaje = async (req, res) => {
  try {
    const viaje = await viajeService.getViaje(req.params.id);
    
    if (!viaje) {
      return res.status(404).json({ error: 'Viaje no encontrado' });
    }

    res.json({ viaje });

  } catch (error) {
    console.error('Error en controlador getViaje:', error);
    res.status(500).json({ error: error.message });
  }
};

const obtenerViajeActivo = async (req, res) => {
  const conductorId = req.params.conductor_id;
  try {
    const viajeActivo = await viajeService.getViajeActivo(conductorId);
    res.json({ viaje: viajeActivo || null });
  } catch (error) {
    console.error('Error al obtener viaje activo:', error);
    res.status(500).json({ error: 'Error al obtener viaje activo' });
  }
};

const finalizarViaje = async (req, res) => {
  const { id } = req.params;  

  try {
    const viajeFinalizado = await viajeService.finalizarViaje(id);
    res.status(200).json({ mensaje: 'Viaje finalizado correctamente', viaje: viajeFinalizado });
  } catch (error) {
    console.error('Error al finalizar viaje:', error.message);
    res.status(400).json({ error: error.message });
  }
};


const listarViajesDisponible = async (req, res) => {
  try {
    const viajes = await viajeService.listarViajesDisponibles();
    res.status(200).json({
      mensaje: 'Viajes disponibles encontrados',
      viajes
    });
  } catch (error) {
    console.error('Error en obtenerViajesDisponibles:', error);
    res.status(500).json({
      error: 'Error al obtener viajes disponibles'
    });
  }
};


module.exports = { crearViaje , getViaje , finalizarViaje, listarViajesDisponible, obtenerViajeActivo};
