const campusService = require('../services/campus.service');

const getTodosLosCampus = async (req, res) => {
  try {
    const campus = await campusService.obtenerTodosLosCampus();
    res.status(200).json(campus);
  } catch (error) {
    console.error('Error al obtener campus:', error);
    res.status(500).json({ message: 'Error al obtener los campus universitarios' });
  }
};



async function crearCampusController(req, res) {
  try {
    const data = req.body;
    if (!data.nombre || !data.direccion) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    const campusCreado = await campusService.crearCampus(data);
    res.status(201).json(campusCreado);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear campus', details: error.message });
  }
}

module.exports = {
  getTodosLosCampus, crearCampusController
};
