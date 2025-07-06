// controllers/viaje.controller.js
const viajeService = require('../services/viaje.service');

const publicarViaje = async (req, res) => {
  try {
    const nuevoViaje = await viajeService.publicarViaje(req.body);
    res.status(201).json({ message: 'Viaje publicado exitosamente', data: nuevoViaje });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const listarViajes = async (req, res) => {
  try {
    const viajes = await viajeService.listarViajes();
    res.status(200).json({ data: viajes });
  } catch (error) {
    res.status(500).json({ message: 'Error al listar los viajes' });
  }
};

const obtenerViajesPorConductor = async (req, res) => {
  try {
    const { id } = req.params;
    const viajes = await viajeService.obtenerViajesPorConductor(id);
    res.status(200).json({ data: viajes });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los viajes del conductor' });
  }
};

module.exports = {
  publicarViaje,
  listarViajes,
  obtenerViajesPorConductor
};
