import express from 'express';
import methodOverride from 'method-override';
import {
  obtenerTodosLosSuperheroesController,
  crearSuperheroeController,
  actualizarSuperheroeController,
  eliminarSuperheroeController,
  mostrarFormularioNuevoController,
  mostrarFormularioEdicionController
} from '../controllers/superheroesController.mjs';


const router = express.Router();

// Importante: methodOverride ANTES de las rutas
router.use(methodOverride('_method'));

//ruta al index.ejs
router.get('/', (req, res) => {
  res.render('index', { title: 'Inicio' , layout: false });
});

// Dashboard (usa controlador que ya maneja web/API)
router.get('/dashboard', obtenerTodosLosSuperheroesController);

// Formulario de nuevo heroe
router.get('/superheroes/nuevo', mostrarFormularioNuevoController);

// Crear nuevo héroe (POST)
router.post('/superheroes', crearSuperheroeController);

// Formulario de edición (vista directa)
router.get('/superheroes/editar/:id', mostrarFormularioEdicionController);

// Actualizar (PUT vía method-override)
router.put('/superheroes/:id', actualizarSuperheroeController);

// Eliminar (DELETE vía method-override)
router.delete('/superheroes/:id', eliminarSuperheroeController);

export default router;