




const { Viaje, Usuario, Reserva,sequelize } = require('../models');

const Ruta = require('../models/ruta.model'); 

const { Op } = require('sequelize');


const crearViaje = async ({
  direccion_seleccionada,
  hora_salida, // "ahora" o "en_5_minutos"
  asientos_disponibles,
  precio_asiento,
  descripcion,
  conductor_id
}) => {

  const viajeActivo = await Viaje.findOne({
    where: {
      conductor_id,
      estado: 'activo'
    }
  });

  if (viajeActivo) {
    throw new Error('Este conductor ya tiene un viaje activo.');
  }
  
  const ruta = await Ruta.findOne({ where: { usuario_id: conductor_id } });
  if (!ruta) throw new Error('Ruta del conductor no encontrada');

  
  let origen, destino;
  if (direccion_seleccionada === 'hacia_universidad') {
    origen = ruta.direccion_casa;
    destino = ruta.direccion_campus;
  } else if (direccion_seleccionada === 'hacia_casa') {
    origen = ruta.direccion_campus;
    destino = ruta.direccion_casa;
  } else {
    throw new Error('Dirección seleccionada no válida');
  }

  
  let hora_salida_final;
  const now = new Date();
  if (hora_salida === 'ahora') {
    hora_salida_final = now.toTimeString().slice(0, 5); // "HH:mm"
  } else if (hora_salida === 'en_5_minutos') {
    now.setMinutes(now.getMinutes() + 5);
    hora_salida_final = now.toTimeString().slice(0, 5);
  } else {
    throw new Error('Hora de salida no válida');
  }


  const nuevoViaje = await Viaje.create({
    conductor_id,
    origen,
    destino,
    hora_salida: hora_salida_final,
    asientos_disponibles,
    precio_asiento,
    descripcion
  });

  return nuevoViaje;
};

const getViaje = async (id) => {
  try {
    const viaje = await Viaje.findByPk(id, {
      attributes: [
        'origen',
        'destino',
        'hora_salida',
        'asientos_disponibles',
        'precio_asiento',
        'descripcion',
        'estado'
      ]
    });

    if (!viaje) {
      throw new Error('Viaje no encontrado');
    }

    return viaje;
  } catch (error) {
    console.error('Error al obtener viaje:', error);
    throw error; 
  }
};

const getViajeActivo = async (conductor_id) => {
  return await Viaje.findOne({
    where: {
      conductor_id,
      estado: 'activo'
    }
  });
};


const finalizarViaje = async (viajeId) => {
  const viaje = await Viaje.findByPk(viajeId);
  if (!viaje) {
    throw new Error('Viaje no encontrado');
  }

  viaje.estado = 'finalizado';
  await viaje.save();

await Reserva.update(
    { estado: 'finalizada' },
    {
      where: {
        viaje_id: viajeId,
        estado: 'aceptada'
      }
    }
  );

  const reservas = await Reserva.findAll({
    where:{
      viaje_id: viajeId,
      estado:'finalizada'
    }
  });

   /* reservas.forEach(reserva => {
    io.to(`user-${reserva.pasajero_id}`).emit('viajeFinalizado', {
      mensaje: 'Su viaje ha finalizado. ¡Gracias por viajar con nosotros!',
      viajeId: viajeId
    });
  });*/


  return viaje;
};



const listarViajesDisponibles = async () => {
  try {
    const viajes = await Viaje.findAll({
      where: {
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
          as: 'conductor', // alias definido en las relaciones
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
        id: viaje.conductor.id,
        nombre: `${viaje.conductor.nombre} ${viaje.conductor.apellido}`,
        fotoPerfil: viaje.conductor.fotoPerfil
      }
    }));
  } catch (error) {
    console.error('Error al listar viajes disponibles:', error);
    throw error;
  }
};



//obtener todos los viajes pasados(finalizados)

const GetMisViajes = async (conductor_id) => {
  try {
    const viajes = await Viaje.findAll({
      where: {
        conductor_id,
        estado: 'finalizado'
      },
      attributes: [
        'id',
        'origen',
        'destino',
        'hora_salida',
        'asientos_disponibles',
        'precio_asiento',
        'descripcion',
        'estado'
      ],
      include: [
        {
          model: Usuario,
          as: 'conductor', // alias definido en las relaciones
          attributes: ['id', 'nombre', 'apellido', 'fotoPerfil']
        }
      ],
      order: [['hora_salida', 'DESC']] // Opcional: ordenar por fecha/hora de salida descendente
    });

    return viajes.map(viaje => ({
      id: viaje.id,
      origen: viaje.origen,
      destino: viaje.destino,
      hora_salida: viaje.hora_salida,
      asientos_disponibles: viaje.asientos_disponibles,
      precio_asiento: viaje.precio_asiento,
      descripcion: viaje.descripcion,
      estado: viaje.estado,
      conductor: {
        id: viaje.Usuario.id,
        nombre: `${viaje.Usuario.nombre} ${viaje.Usuario.apellido}`,
        fotoPerfil: viaje.Usuario.fotoPerfil
      }
    }));
  } catch (error) {
    console.error('Error al listar viajes finalizados del conductor:', error);
    throw error;
  }
};



module.exports = { crearViaje, getViaje, finalizarViaje, listarViajesDisponibles, getViajeActivo, GetMisViajes };
