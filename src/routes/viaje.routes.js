


const express = require('express');
const router = express.Router();
const viajeController = require('../controllers/viaje.controller');

// Ruta para activar un viaje
router.post('/', viajeController.crearViaje);


router.put('/finalizar/:id', viajeController.finalizarViaje);

router.get('/:id', viajeController.getViaje);


module.exports = router;
