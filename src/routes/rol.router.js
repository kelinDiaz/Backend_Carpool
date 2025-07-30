const express = require('express');
const router = express.Router();
const { crearRolController } = require('../controllers/rol.controller');

router.post('/crear', crearRolController);

module.exports = router;
