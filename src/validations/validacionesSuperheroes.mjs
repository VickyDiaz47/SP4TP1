import { body } from 'express-validator';

export const validarSuperheroe = [
  // nombreSuperHeroe
  body('nombreSuperHeroe')
    .notEmpty().withMessage('El nombre del superhéroe es obligatorio')
    .trim()
    .isLength({ min: 3 }).withMessage('El nombre del superhéroe debe tener al menos 3 caracteres')
    .isLength({ max: 60 }).withMessage('El nombre del superhéroe no debe superar los 60 caracteres'),

  // nombreReal
  body('nombreReal')
    .notEmpty().withMessage('El nombre real es obligatorio')
    .trim()
    .isLength({ min: 3 }).withMessage('El nombre real debe tener al menos 3 caracteres')
    .isLength({ max: 60 }).withMessage('El nombre real no debe superar los 60 caracteres'),

  // edad
  body('edad')
    .notEmpty().withMessage('La edad es obligatoria')
    .trim()
    .isNumeric().withMessage('La edad debe ser un número')
    .custom(value => Number(value) >= 0).withMessage('La edad no puede ser negativa'),

  // poderes
  body('poderes')
    .isArray({ min: 1 }).withMessage('Poderes debe ser un array con al menos un elemento')
    .custom((arr) => {
      return arr.every(
        p => typeof p === 'string' &&
             p.trim().length >= 3 &&
             p.trim().length <= 60
      );
    }).withMessage('Cada poder debe ser un string entre 3 y 60 caracteres sin espacios vacíos')
];