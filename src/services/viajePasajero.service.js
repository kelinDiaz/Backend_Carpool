

const { Viaje, Usuario, Vehiculo } = require('../models');

const obtenerDetalleViajeParaPasajero = async (idViaje) => {
  
    try {
    const viaje = await Viaje.findByPk(idViaje, {
      include: [
        {
          model: Usuario,
          attributes: ['id', 'nombre', 'apellido', 'fotoPerfil', 'telefono'],
          include: [
            {
              model: Vehiculo,
              attributes: ['marca', 'modelo', 'placa', 'color']
            }
          ]
        }
      ]
    });

    if (!viaje) return null;

    return viaje;
  } catch (error) {
    console.error('Error al obtener detalles del viaje para pasajero:', error);
    throw error;
  }
};


module.exports = {
  obtenerDetalleViajeParaPasajero
};