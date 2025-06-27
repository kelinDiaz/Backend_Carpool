

const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');

router.post('/usuarios', usuarioController.registrarUsuario);
router.post('/usuarios/inicioSesion', usuarioController.inicioSesion);

module.exports = router;
