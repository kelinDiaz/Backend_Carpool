

const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');

router.post('/usuarios', usuarioController.registrarUsuario);
router.post('/usuarios/inisioSesion', usuarioController.inicioSesion);

module.exports = router;
