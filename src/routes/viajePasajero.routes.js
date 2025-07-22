
const express = require('express');
const router = express.Router();

const viajePasajeroController = require('../controllers/viajePasajero.controller');


router.get('/detalle/:id', viajePasajeroController.getViajeDetallePasajero);


module.exports = router;
