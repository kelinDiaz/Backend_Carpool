


const express = require('express');
const router = express.Router();
const viajeController = require('../controllers/viaje.controller');




router.post('/', viajeController.crearViaje);


router.put('/finalizar/:id', viajeController.finalizarViaje);


router.get('/disponibles', viajeController.listarViajesDisponible);



router.get('/:id', viajeController.getViaje);

module.exports = router;
