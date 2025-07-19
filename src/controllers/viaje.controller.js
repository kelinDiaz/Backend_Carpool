
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



const finalizarViaje = async (req, res) => {
  const { id } = req.params; // 

  try {
    const viajeFinalizado = await viajeService.finalizarViaje(id);
    res.status(200).json({ mensaje: 'Viaje finalizado correctamente', viaje: viajeFinalizado });
  } catch (error) {
    console.error('Error al finalizar viaje:', error.message);
    res.status(400).json({ error: error.message });
  }
};


module.exports = { crearViaje , finalizarViaje};
