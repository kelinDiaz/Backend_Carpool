

const { getMisViajes } = require('../controllers/viaje.controller');
const { Viaje, Usuario, Vehiculo,Reserva, ViajePasajero  } = require('../models');
const { Op, fn, col, where } = require('sequelize');



const obtenerDetalleViajeParaPasajero = async (idViaje) => {
  
    try {
    const viaje = await Viaje.findByPk(idViaje, {
      include: [
        {
          model: Usuario,
          as: 'conductor', 
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
        [Op.and]: [
          {
            [Op.or]: [
              where(fn('LOWER', col('destino')), {
                [Op.like]: `%${termino.toLowerCase()}%`
              }),
              where(fn('LOWER', col('origen')), {
                [Op.like]: `%${termino.toLowerCase()}%`
              })
            ]
          },
          { estado: 'activo' },
          { asientos_disponibles: { [Op.gt]: 0 } }
        ]
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
          as: 'conductor',
          attributes: ['id', 'nombre', 'apellido', 'fotoPerfil']
        }
      ]
    });

    console.log("Viajes encontrados:", viajes.map(v => v.origen + ' → ' + v.destino));
    return viajes.map(viaje => ({
      id: viaje.id,
      origen: viaje.origen,
      destino: viaje.destino,
      hora_salida: viaje.hora_salida,
      asientos_disponibles: viaje.asientos_disponibles,
      precio_asiento: viaje.precio_asiento,
      descripcion: viaje.descripcion,
      conductor: {
        id: viaje.conductor.id,
        nombre: `${viaje.conductor.nombre} ${viaje.conductor.apellido}`,
        fotoPerfil: viaje.conductor.fotoPerfil
      }
    }));
  } catch (error) {
    console.error(' Error al buscar viajes por destino:', error);
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
        as: 'conductor',
      
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



/*const obtenerEstadoViajePorPasajero = async (pasajeroId) => {

  const viajePasajero = await ViajePasajero.findOne({
    where: { pasajero_id: pasajeroId },
    order: [['fecha_reserva', 'DESC']]
  });

  if (!viajePasajero) return null;

  const viaje = await Viaje.findOne({
    where: { id: viajePasajero.viaje_id }
  });

  return viaje;
};




*/



module.exports = {
  obtenerDetalleViajeParaPasajero, 
  buscarViajesPorDestino,
  obtenerViajeAceptadoPorPasajero, 
  getMisViajesP, 
  /*obtenerEstadoViajePorPasajero*/
};