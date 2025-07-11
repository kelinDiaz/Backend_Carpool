const rutaService = require('../services/ruta.service');

const crearRuta = async (req, res) => {
  try {
    const {
      usuario_id,
      direccion_casa,
      direccion_campus,
      latitud_casa,
      longitud_casa,
      latitud_campus,
      longitud_campus
    } = req.body;

    if (!usuario_id || !direccion_casa || !direccion_campus) {
      return res.status(400).json({ message: 'usuario_id, direccion_casa y direccion_campus son requeridos' });
    }

    const nuevaRuta = await rutaService.crearRuta({
      usuario_id,
      direccion_casa,
      direccion_campus,
      latitud_casa,
      longitud_casa,
      latitud_campus,
      longitud_campus
    });

    res.status(201).json(nuevaRuta);
  } catch (error) {
    console.error('Error al crear la ruta:', error);
    res.status(500).json({ message: 'Error al registrar la ruta' });
  }
};

module.exports = {
  crearRuta
};
