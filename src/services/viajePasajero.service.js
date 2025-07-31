

const { getMisViajes } = require('../controllers/viaje.controller');
const { Viaje, Usuario, Vehiculo,Reserva, ViajePasajero  } = require('../models');
const { Op } = require('sequelize');

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


const buscarViajesPorDestino = async (termino) => {
  try {
    const viajes = await Viaje.findAll({
      where: {
        destino: {
          [Op.like]: `%${termino}%`
        },
        estado: 'activo',
        asientos_disponibles: { [Op.gt]: 0 }
      },
      attributes: [
        'id',
        'origen',
        'destino',
        'hora_salida',
        'asientos_disponibles',
        'precio_asiento',
        'descripcion'
      ],
      include: [
        {
          model: Usuario,
          attributes: ['id', 'nombre', 'apellido', 'fotoPerfil']
        }
      ]
    });

    return viajes.map(viaje => ({
      id: viaje.id,
      origen: viaje.origen,
      destino: viaje.destino,
      hora_salida: viaje.hora_salida,
      asientos_disponibles: viaje.asientos_disponibles,
      precio_asiento: viaje.precio_asiento,
      descripcion: viaje.descripcion,
      conductor: {
        id: viaje.Usuario.id,
        nombre: `${viaje.Usuario.nombre} ${viaje.Usuario.apellido}`,
        fotoPerfil: viaje.Usuario.fotoPerfil
      }
    }));
  } catch (error) {
    console.error('Error al buscar viajes por destino:', error);
    throw error;
  }
};

//Obtiene el viaje en curso del viaje, el viaje que ha sido aceptado
const obtenerViajeAceptadoPorPasajero = async (pasajeroId) => {
  const reservaAceptada = await Reserva.findOne({
    where: {
      pasajero_id: pasajeroId,
      estado: 'aceptada'
    }
  });

  if (!reservaAceptada) return null;

  const viaje = await Viaje.findByPk(reservaAceptada.viaje_id, {
    attributes: [
      'id',
      'origen',
      'destino',
      'hora_salida',
      'asientos_disponibles',
      'precio_asiento',
      'descripcion'
      
    ],
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

  return viaje;
};




const getMisViajesP = async (pasajeroId) => {
  const viajes = await Viaje.findAll({
    include: [
      {
        model: ViajePasajero,
        where: { pasajero_id: pasajeroId },
        attributes: [],
      },
      {
        model: Usuario,
        as: 'conductor',
        attributes: ['id', 'nombre', 'apellido', 'fotoPerfil']
      }
    ],
    where: {
      estado: 'finalizado'
    },
    order: [['hora_salida', 'DESC']]
  });

  return viajes;
};



module.exports = {
  obtenerDetalleViajeParaPasajero, 
  buscarViajesPorDestino,
  obtenerViajeAceptadoPorPasajero, 
  getMisViajesP
};