
const express = require('express');
const router = express.Router();

const viajePasajeroController = require('../controllers/viajePasajero.controller');


router.get('/detalle/:id', viajePasajeroController.getViajeDetallePasajero);

router.get('/buscar', viajePasajeroController.buscarViajesPorDestino);


module.exports = router;
