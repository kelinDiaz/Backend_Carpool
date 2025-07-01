
const { body } = require('express-validator');

const validateRegistro = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es requerido')
    .isLength({ min: 2 }).withMessage('Mínimo 2 caracteres'),
    
  body('dni')
    .matches(/^\d{4}-\d{4}-\d{5}$/).withMessage('Formato de DNI inválido (XXXX-XXXX-XXXXX)'),
    
  body('correo')
    .isEmail().withMessage('Correo electrónico inválido')
    .normalizeEmail(),
    
  body('contrasena')
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    
  body().custom((value, { req }) => {
    if (req.body.rol === 'conductor') {
      if (!req.body.marca) throw new Error('Marca del vehículo es requerida');
      if (!req.body.placa) throw new Error('Placa es requerida');
    }
    return true;
  })
];

module.exports = { validateRegistro };