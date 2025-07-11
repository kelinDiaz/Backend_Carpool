
const Campus = require('../models/campusUniversitario.model');

const obtenerTodosLosCampus = async () => {
  return await Campus.findAll({
    attributes: ['id', 'nombre'] 
  });
};

module.exports = {
  obtenerTodosLosCampus
};
