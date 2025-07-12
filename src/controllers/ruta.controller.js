
const rutaService = require('../services/ruta.service');

const crearRuta = async (req, res) => {
  try {
    const { usuario_id, direccion_casa } = req.body;

    if (!usuario_id || !direccion_casa) {
      return res.status(400).json({ message: 'usuario_id y direccion_casa son requeridos' });
    }

    const nuevaRuta = await rutaService.crearRuta({ usuario_id, direccion_casa });

    res.status(201).json(nuevaRuta);
  } catch (error) {
    console.error('Error al crear la ruta:', error.message);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  crearRuta
};
