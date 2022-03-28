const {body} = require('express-validator');

const validateForm = [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('edad').notEmpty().withMessage('La edad es obligatoria').isNumeric().withMessage('La edad debe ser un número')
]

module.exports = validateForm;