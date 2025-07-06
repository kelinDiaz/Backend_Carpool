const express = require('express');
const router = express.Router();
const viajeController = require('../controllers/viaje.controller');
const { validatePublicarViaje } = require('../middlewares/validators/viaje.validator');



router.get('/status', (req, res) => {
  res.json({
    success: true,
    message: 'Servicio de viajes funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});




router.post('/publicar',  validatePublicarViaje, viajeController.publicarViaje);

router.get('/listar', viajeController.listarViajes);

router.get('/conductor/:id', viajeController.obtenerViajesPorConductor);

router.get('/disponibles', viajeController.listarViajesConPlazasDisponibles);


router.use((err, req, res, next) => {
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Error de validación en los datos enviados',
      errors: err.errors.map(e => e.message)
    });
  }
  next(err);
});

module.exports = router;
