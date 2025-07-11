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

module.exports = {
  getTodosLosCampus
};
