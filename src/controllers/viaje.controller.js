
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

module.exports = { crearViaje };
