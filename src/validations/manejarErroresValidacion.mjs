import { validationResult } from 'express-validator';

export function manejarErroresDeValidacion(req, res, next) {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({
      mensaje: 'Error de validación en los datos enviados',
      errores: errores.array().map(err => err.msg)
    });
  }
  next();
}