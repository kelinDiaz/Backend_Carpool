
//Set-ExecutionPolicy Bypass -Scope Process
const express = require('express');
const router = express.Router()

const admiController = require('../controllers/admi.controller');

router.get('/status', (req, res) => {
  res.json({
    success: true,
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});


router.get('/conductores', admiController.VerConductores);
router.get('/pasajeros', admiController.VerPasajeros);
router.get('/viajes', admiController.VerHistorialViaje);
router.get('/reserva', admiController.VerHistorialReserva);
router.get('/usuariosInactivos', admiController.VerUsuariosInactivos);

router.post('/conductor/:id', admiController.verInfoConductor);
router.post('/pasajero/:id', admiController.verInfoPasajero);
router.post('/viajeDetalleConductor/:id', admiController.viajeDetalleConductor);
router.post('/viajeDetalle/:id', admiController.viajeDetalle);
router.post('/conductorAceptado/:id', admiController.aceptarConductorController);
router.post('/usuario/:id', admiController.aceptarUsuarioController);

router.delete('/pasajero/:id', admiController.eliminarPasajero);
router.delete('/reserva/:id', admiController.eliminarViaje);
router.delete('/conductor/:id', admiController.eliminarConductor);



module.exports = router;