

const { body, validationResult } = require('express-validator');

const validatePublicarViaje = [
  body('origen')
    .notEmpty().withMessage('El origen es obligatorio')
    .isString().withMessage('El origen debe ser una cadena de texto'),

  body('destino')
    .notEmpty().withMessage('El destino es obligatorio')
    .isString().withMessage('El destino debe ser una cadena de texto'),

  body('fecha_salida')
    .notEmpty().withMessage('La fecha de salida es obligatoria')
    .isISO8601().withMessage('La fecha debe tener formato YYYY-MM-DD'),

  body('hora_salida')
    .notEmpty().withMessage('La hora de salida es obligatoria')
    .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).withMessage('La hora debe tener formato HH:mm:ss'),

  body('precio')
    .notEmpty().withMessage('El precio es obligatorio')
    .isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),

  body('plazas_disponibles')
    .optional()
    .isInt({ min: 0 }).withMessage('Las plazas disponibles deben mayor o igual a 0'),

  body('conductor_id')
    .notEmpty().withMessage('El id del conductor es obligatorio')
    .isInt({ min: 1 }).withMessage('El id del conductor debe ser un número entero positivo'),

  // Middleware para procesar errores de validación
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map(err => err.msg)
      });
    }
    next();
  }
];

module.exports = { validatePublicarViaje };
