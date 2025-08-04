
const gananciaService = require('../services/ganancia.service');

const crearGanancia = async (req, res) => {
  try {
    const { viajeId } = req.params;
    const ganancia = await gananciaService.registrarGananciaPorViaje(viajeId);
    res.status(201).json(ganancia);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getGananciaPorViaje = async (req, res) => {
  try {
    const { viajeId } = req.params;
    const ganancia = await gananciaService.obtenerGananciaPorViaje(viajeId);
    res.status(200).json(ganancia);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const obtenerGananciasPorConductor = async (req, res) => {
  try {
    const { conductorId } = req.params;
    const ganancias = await gananciaService.obtenerGananciasPorConductor(conductorId);
    res.status(200).json(ganancias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = {
  crearGanancia,
  getGananciaPorViaje,
  obtenerGananciasPorConductor
};
