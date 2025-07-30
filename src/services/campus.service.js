
const Campus = require('../models/campusUniversitario.model');


async function crearCampus(data) {
  try {
    const nuevoCampus = await Campus.create({
      nombre: data.nombre,
      direccion: data.direccion
    });
    return nuevoCampus;
  } catch (error) {
    console.error('Error creando campus:', error);
    throw error;
  }
}


const obtenerTodosLosCampus = async () => {
  return await Campus.findAll({
    attributes: ['id', 'nombre'] 
  });
};

module.exports = {
  obtenerTodosLosCampus, crearCampus
};
