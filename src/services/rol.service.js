
const Rol = require('../models/rol.model');



async function crearRol(data) {
  try {
    
    const nuevoRol = await Rol.create({
      id: data.id,
      nombre: data.nombre
    });
    return nuevoRol;
  } catch (error) {
    console.error('Error creando rol:', error);
    throw error;
  }
}

module.exports = { crearRol };