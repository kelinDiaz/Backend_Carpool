
const express = require('express');
const router = express.Router();

const viajePasajeroController = require('../controllers/viajePasajero.controller');


router.get('/detalle/:id', viajePasajeroController.getViajeDetallePasajero);

router.get('/buscar', viajePasajeroController.buscarViajesPorDestino);

router.get('/pasajero/:pasajero_id/viaje-aceptado', viajePasajeroController.obtenerViajeDePasajero);


module.exports = router;
