


const Viaje = require('../models/viaje.model');
const Ruta = require('../models/ruta.model')

const crearViaje = async ({
  direccion_seleccionada,
  hora_salida, // "ahora" o "en_5_minutos"
  asientos_disponibles,
  precio_asiento,
  descripcion,
  conductor_id
}) => {
  
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


const finalizarViaje = async (viajeId) => {
  const viaje = await Viaje.findByPk(viajeId);
  if (!viaje) {
    throw new Error('Viaje no encontrado');
  }

  viaje.estado = 'finalizado';
  await viaje.save();

  return viaje;
};



module.exports = { crearViaje, finalizarViaje };
