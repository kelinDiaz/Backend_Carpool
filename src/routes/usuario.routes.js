const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');
const { usuarioUpload } = require('../config/multer'); 
const { validateRegistro } = require('../middlewares/validators/usuario.validator'); 

router.get('/status', (req, res) => {
  res.json({
    success: true,
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

router.post('/',
  usuarioUpload,      
  validateRegistro,   
  usuarioController.registrarUsuario
);

router.post('/inicioSesion', usuarioController.inicioSesion);
router.get('/check-dni', usuarioController.checkDNI);
router.get('/check-correo', usuarioController.checkCorreo);
router.get('/check-placa', usuarioController.checkPlaca);
router.put('/actualizacion/:correo', usuarioController.actualizacion);
router.put('/actualizacionContra/:correo', usuarioController.actualizacionContra);
router.get('/fotoPerfil/:id', usuarioController.cFotoPerfil);
router.get('/fotoCarnet/:id', usuarioController.cFotoCarnet);

router.use((err, req, res, next) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({
      success: false,
      message: 'El archivo excede el tamaño máximo permitido (2MB)'
    });
  }
  if (err.code === 'LIMIT_FILE_COUNT') {
    return res.status(400).json({
      success: false,
      message: 'Se excedió el número máximo de archivos permitidos'
    });
  }
  if (err.message && err.message.includes('Tipo de archivo no permitido')) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
  next(err);
});

module.exports = router;
