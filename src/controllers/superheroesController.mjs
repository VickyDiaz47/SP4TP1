import {
  obtenerSuperheroePorId,
  obtenerTodosLosSuperheroes,
  buscarSuperheroesPorAtributo,
  obtenerSuperheroesMayoresDe30,
  crearSuperheroe,
  actualizarSuperheroe,
  eliminarSuperheroe,
  eliminarSuperheroePorNombre
} from '../services/superheroesService.mjs';

import {
  renderizarSuperheroe,
  renderizarListaSuperheroes
} from '../views/responseView.mjs';

export const getDashboard = async (req, res) => {
  const superHeroes = await SuperHero.find();
  res.render('dashboard', { superHeroes, title: 'Dashboard' });
};

/*--------- API Controllers ---------*/

export async function obtenerSuperheroePorIdController(req, res) {
  try {
    const { id } = req.params;
    const superheroe = await obtenerSuperheroePorId(id);

    if (!superheroe) {
      return res.status(404).json({ mensaje: 'Superhéroe no encontrado' });
    }

    res.status(200).json(renderizarSuperheroe(superheroe));
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener el superhéroe',
      error: error.message
    });
  }
}

export async function obtenerTodosLosSuperheroesController(req, res) {
  try {
    const superheroes = await obtenerTodosLosSuperheroes();
    const esAPI = req.originalUrl.startsWith('/api');

    if (esAPI) {
      return res.status(200).json(renderizarListaSuperheroes(superheroes));
    }

    res.render('dashboard', {
      heroes: superheroes,
      eliminado: req.query.eliminado
    });
  } catch (error) {
    const esAPI = req.originalUrl.startsWith('/api');
    if (esAPI) {
      return res.status(500).json({
        mensaje: 'Error al obtener los superhéroes',
        error: error.message
      });
    }

    res.status(500).send('Error al cargar el dashboard');
  }
}

export async function buscarSuperheroesPorAtributoController(req, res) {
  try {
    const { atributo, valor } = req.params;
    const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);

    if (superheroes.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron superhéroes con ese atributo' });
    }

    res.status(200).json(renderizarListaSuperheroes(superheroes));
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al buscar los superhéroes',
      error: error.message
    });
  }
}

export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
  try {
    const superheroes = await obtenerSuperheroesMayoresDe30();

    if (superheroes.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron superhéroes mayores de 30 años' });
    }

    res.status(200).json(renderizarListaSuperheroes(superheroes));
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener superhéroes mayores de 30',
      error: error.message
    });
  }
}

export async function eliminarSuperheroePorNombreController(req, res) {
  try {
    const { nombre } = req.params;
    const heroeEliminado = await eliminarSuperheroePorNombre(nombre);

    if (!heroeEliminado) {
      return res.status(404).json({ mensaje: `No se encontró un superhéroe con el nombre "${nombre}"` });
    }

    res.status(200).json({
      mensaje: `Superhéroe "${nombre}" eliminado con éxito`,
      heroe: renderizarSuperheroe(heroeEliminado)
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al eliminar el superhéroe por nombre',
      error: error.message
    });
  }
}

/*--------- Vista + API ---------*/

export async function crearSuperheroeController(req, res) {
  try {
    const nuevoHeroe = await crearSuperheroe(req.body);
    const esAPI = req.originalUrl.startsWith('/api');

    if (esAPI) {
      return res.status(201).json(renderizarSuperheroe(nuevoHeroe));
    }

    res.redirect('/dashboard');
  } catch (error) {
    const esAPI = req.originalUrl.startsWith('/api');

    if (esAPI) {
      return res.status(400).json({
        mensaje: 'Error al crear el superhéroe',
        error: error.message
      });
    }

    res.status(500).send('Error al crear el superhéroe');
  }
}

export async function actualizarSuperheroeController(req, res) {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;
    const heroeActualizado = await actualizarSuperheroe(id, datosActualizados);

    if (!heroeActualizado) {
      return res.status(404).json({ mensaje: 'Superhéroe no encontrado' });
    }

    const esAPI = req.originalUrl.startsWith('/api');

    if (esAPI) {
      const todosLosHeroes = await obtenerTodosLosSuperheroes();
      return res.status(200).json(renderizarListaSuperheroes(todosLosHeroes));
    }

    res.redirect('/dashboard');
  } catch (error) {
    const esAPI = req.originalUrl.startsWith('/api');

    if (esAPI) {
      return res.status(500).json({
        mensaje: 'Error al actualizar el superhéroe',
        error: error.message
      });
    }

    res.status(500).send('Error al actualizar el superhéroe');
  }
}

export async function eliminarSuperheroeController(req, res) {
  try {
    const { id } = req.params;
    const heroeEliminado = await eliminarSuperheroe(id);

    if (!heroeEliminado) {
      return res.status(404).json({ mensaje: 'Superhéroe no encontrado' });
    }

    const esAPI = req.originalUrl.startsWith('/api');

    if (esAPI) {
      return res.status(200).json({
        mensaje: 'Superhéroe eliminado con éxito',
        heroe: renderizarSuperheroe(heroeEliminado)
      });
    }

    res.redirect('/dashboard?eliminado=' + encodeURIComponent(heroeEliminado.nombreSuperHeroe));
  } catch (error) {
    const esAPI = req.originalUrl.startsWith('/api');

    if (esAPI) {
      return res.status(500).json({
        mensaje: 'Error al eliminar el superhéroe',
        error: error.message
      });
    }

    res.status(500).send('Error al eliminar el superhéroe');
  }
}

/*--------- Solo vistas ---------*/

export function mostrarFormularioNuevoController(req, res) {
  res.render('addSuperhero');
}

export async function mostrarFormularioEdicionController(req, res) {
  try {
    const { id } = req.params;
    const heroe = await obtenerSuperheroePorId(id);

    if (!heroe) {
      return res.status(404).send('Superhéroe no encontrado');
    }

    res.render('editSuperhero', { heroe });
  } catch (error) {
    console.error('Error al cargar edición:', error.message);
    res.status(500).send('Error al cargar el formulario de edición');
  }
}