


const express = require('express');
const router = express.Router();
const viajeController = require('../controllers/viaje.controller');




router.post('/', viajeController.crearViaje);

router.put('/finalizar/:id', viajeController.finalizarViaje);

router.get('/disponibles', viajeController.listarViajesDisponible);

router.get('/activo/:conductor_id', viajeController.obtenerViajeActivo);

router.get('/:id', viajeController.getViaje);

router.get('/conductor/finalizados/:conductor_id/', viajeController.getMisViajes);

module.exports = router;
