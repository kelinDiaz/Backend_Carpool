
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

const obtenerRutaPorUsuarioId = async (req, res) => {
  try {
    const { id } = req.params;
    const ruta = await rutaService.obtenerRutaPorUsuarioId(id);

    if (!ruta) {
      return res.status(404).json({ message: 'Ruta no encontrada' });
    }

    res.status(200).json(ruta);
  } catch (error) {
    console.error('Error al obtener la ruta:', error.message);
    res.status(500).json({ message: 'Error al obtener la ruta' });
  }
};




module.exports = {
  crearRuta,
  obtenerRutaPorUsuarioId
};
