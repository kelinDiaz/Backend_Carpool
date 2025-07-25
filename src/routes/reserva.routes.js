
const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reserva.controller');

router.post('/solicitar', reservaController.solicitarReserva);

router.put('/responder/:id', reservaController.responderReserva);

router.get('/conductor/:conductor_id', reservaController.listarReservasConductor);
router.get('/pasajero/:pasajero_id', reservaController.listarReservasPasajero);

router.get('/pasajeros/:viajeId', reservaController.obtenerPasajerosPorViaje);

module.exports = router;
