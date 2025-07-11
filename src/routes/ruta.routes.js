const express = require('express');
const router = express.Router();
const rutaController = require('../controllers/ruta.controller');

router.post('/', rutaController.crearRuta);

module.exports = router;
