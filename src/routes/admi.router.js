
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

router.post('/conductor/:id', admiController.verInfoConductor);
router.post('/pasajero/:id', admiController.verInfoPasajero);

router.delete('/pasajero/:id', admiController.eliminarPasajero);
router.delete('/viajes/:id', admiController.eliminarViaje);



module.exports = router;