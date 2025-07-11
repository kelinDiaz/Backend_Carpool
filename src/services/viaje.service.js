


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
  // 1. Obtener ruta del conductor
  const ruta = await Ruta.findOne({ where: { usuario_id: conductor_id } });
  if (!ruta) throw new Error('Ruta del conductor no encontrada');

  // 2. Determinar origen y destino según selección
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

  // 3. Calcular hora de salida (formato HH:mm)
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

  // 4. Crear viaje
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

module.exports = { crearViaje };
