

const express = require('express');
const router = express.Router();
const controller = require('../controllers/calificacion.controller');

// Pasajero califica al conductor (pasajero -> conductor)
router.post('/conductor/:viajeId/:pasajeroId', controller.calificarConductor);

// Conductor califica a un pasajero (conductor -> pasajero)
router.post('/pasajero/:viajeId/:conductorId', controller.calificarPasajero);

// Ver calificaciones recibidas por usuario
router.get('/usuario/:usuarioId/:tipo', controller.verCalificacionesRecibidas);

// Promedio de calificaciones del usuario
router.get('/usuario/:usuarioId/:tipo/promedio', controller.verPromedioUsuario);

//Obtener Calificacion por id de la calificacion
router.get('/:id', controller.obtenerCalificacionPorId);

router.get('/verificar/:viajeId/:calificadorId/:calificadoId/:tipo', controller.verificarCalificacion);

module.exports = router;







