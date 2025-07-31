const calificacionService = require('../services/calificacion.service');

const calificarConductor = async (req, res) => {
  try {
    const { viajeId, pasajeroId } = req.params;
    const { calificacion, comentario } = req.body;

    const calificacionCreada = await calificacionService.crearCalificacion({
      viaje_id: viajeId,
      calificador_id: pasajeroId,
      calificado_id: req.body.conductorId, // debe venir en el body
      tipo: 'conductor',
      calificacion,
      comentario
    });

    res.status(201).json({ mensaje: 'Calificación enviada al conductor', calificacion: calificacionCreada });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const calificarPasajero = async (req, res) => {
  try {
    const { viajeId, conductorId } = req.params;
    const { calificacion, comentario } = req.body;

    const calificacionCreada = await calificacionService.crearCalificacion({
      viaje_id: viajeId,
      calificador_id: conductorId,
      calificado_id: req.body.pasajeroId,
      tipo: 'pasajero',
      calificacion,
      comentario
    });

    res.status(201).json({ mensaje: 'Calificación enviada al pasajero', calificacion: calificacionCreada });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const verCalificacionesRecibidas = async (req, res) => {
  try {
    const { usuarioId, tipo } = req.params;
    const calificaciones = await calificacionService.obtenerCalificacionesRecibidas(usuarioId, tipo);
    res.json(calificaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verPromedioUsuario = async (req, res) => {
  try {
    const { usuarioId, tipo } = req.params;
    const promedio = await calificacionService.obtenerPromedioUsuario(usuarioId, tipo);
    res.json({ promedio: Number(promedio).toFixed(2) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const obtenerCalificacionPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const calificacion = await calificacionService.obtenerCalificacionPorId(id);
    res.json(calificacion);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  calificarConductor,
  calificarPasajero,
  verCalificacionesRecibidas,
  verPromedioUsuario, 
  obtenerCalificacionPorId
};
