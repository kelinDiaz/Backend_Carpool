
const express = require('express');
const router = express.Router();
const controller = require('../controllers/ganancia.controller');


router.post('/:viajeId', controller.crearGanancia);

router.get('/:viajeId', controller.getGananciaPorViaje);

router.get('/conductor/:conductorId', controller.obtenerGananciasPorConductor);


module.exports = router;
