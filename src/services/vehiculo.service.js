const sequelize = require('../config/database');

const Vehiculo = require('../models/vehiculo.model');

const path = require('path');

    const cargarFoto = async ( campo, id) => {
  try {
    const resultado = await Vehiculo.findOne({
      where: { usuario_id : id },
    });

    if (!resultado) {
      throw new Error(`No se encontró el registro con id: ${id}`);
    }

    return {
      valor: resultado[campo] 
    };
  } catch (error) {
    console.error(`Error cargando campo ${campo}:`, error);
    throw error;
  }
};

const verFotoVehiculo = async (id) => await cargarFoto('fotoCarro', id);
const verFotoLicencia = async (id) => await cargarFoto( 'licencia_conducir', id);
const verFotoRevision = async (id) => await cargarFoto( 'fotoRevision', id);


module.exports = {
  verFotoVehiculo,
  verFotoLicencia,
  verFotoRevision
};
