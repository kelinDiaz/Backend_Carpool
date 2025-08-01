
const express = require('express');
const router = express.Router();
const vehiculoController = require('../controllers/vehiculo.controller');

router.get('/status', (req, res) => {
  res.json({
    success: true,
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

router.get('/fotoVehiculo/:id', vehiculoController.cFotoVehiculo);
router.get('/fotoRevision/:id', vehiculoController.cFotoRevision);
router.get('/fotoLicencia/:id', vehiculoController.cFotoLicencia);

module.exports = router;