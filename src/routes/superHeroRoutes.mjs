import express from 'express';
import { validarSuperheroe } from '../validations/validacionesSuperheroes.mjs';
import { manejarErroresDeValidacion } from '../validations/manejarErroresValidacion.mjs';
import {
    obtenerSuperheroePorIdController,
    obtenerTodosLosSuperheroesController,
    buscarSuperheroesPorAtributoController,
    obtenerSuperheroesMayoresDe30Controller,
    crearSuperheroeController,
    actualizarSuperheroeController,
    eliminarSuperheroeController,
    eliminarSuperheroePorNombreController,
} from '../controllers/superheroesController.mjs';


const router = express.Router();

//rutas de lectura GET
router.get('/heroes', obtenerTodosLosSuperheroesController);
router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);
router.get('/heroes/:id', obtenerSuperheroePorIdController);

//ruta de creacion - PUT
router.post('/heroes', validarSuperheroe, manejarErroresDeValidacion, crearSuperheroeController);

//ruta de actualizacion - PUT
router.put('/heroes/:id', actualizarSuperheroeController);

//rutas de eliminacion - DELETE
router.delete('/heroes/:id', eliminarSuperheroeController);
router.delete('/heroes/nombre/:nombre', eliminarSuperheroePorNombreController);

export default router;