const Ruta = require('../models/ruta.model');

const crearRuta = async (datos) => {
  return await Ruta.create(datos);
};

module.exports = {
  crearRuta
};
