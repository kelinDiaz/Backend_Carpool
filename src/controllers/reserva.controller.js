

const reservaService = require('../services/reserva.service');




const solicitarReserva = async (req, res) => {
  try {
    const { pasajero_id, viaje_id, mensaje } = req.body;

    if (!pasajero_id || !viaje_id) {
      return res.status(400).json({ error: 'pasajero_id y viaje_id son requeridos' });
    }

    const reserva = await reservaService.crearReserva(pasajero_id, viaje_id, mensaje);

    res.status(201).json({ mensaje: 'Reserva solicitada correctamente', reserva });
  } catch (error) {
    if (error.message.includes('Ya has enviado una solicitud')) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Error al solicitar reserva', detalle: error.message });
  }
};



const responderReserva = async (req, res) => {
  try {
    const id = req.params.id;
    const { estado } = req.body;

    if (!['aceptada', 'rechazada'].includes(estado)) {
      return res.status(400).json({ error: 'Estado inválido. Debe ser "aceptada" o "rechazada".' });
    }

    const reserva = await reservaService.responderReserva(id, estado);
    res.status(200).json({ mensaje: `Reserva ${estado}`, reserva });
  } catch (error) {
    res.status(500).json({ error: 'Error al responder reserva', detalle: error.message });
  }
};


const listarReservasConductor = async (req, res) => {
  try {
    const { conductor_id } = req.params;
    const reservas = await reservaService.obtenerReservasPorConductor(conductor_id);
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reservas', detalle: error.message });
  }
};

const listarReservasPasajero = async (req, res) => {
  try {
    const { pasajero_id } = req.params;
    const reservas = await reservaService.obtenerReservasPorPasajero(pasajero_id);
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reservas', detalle: error.message });
  }
};

module.exports = {
  solicitarReserva,
  responderReserva,
  listarReservasConductor,
  listarReservasPasajero
};
