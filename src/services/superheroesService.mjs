import superHeroRepository from '../repositories/SuperHeroRepository.mjs';
import superHero from '../models/SuperHero.mjs';

export async function obtenerSuperheroePorId(id) {
   return await superHeroRepository.obtenerPorId(id);
   }

export async function obtenerTodosLosSuperheroes() {
    return await superHeroRepository.obtenerTodos();
}

export async function buscarSuperheroesPorAtributo(atributo, valor) {
    return await superHeroRepository.buscarPorAtributo(atributo, valor);
}

export async function obtenerSuperheroesMayoresDe30() {
    return await superHeroRepository.obtenerMayoresDe30();
}

/*---------------*/
export async function crearSuperheroe(datos) {
  const nuevoHeroe = new superHero(datos);
  return await nuevoHeroe.save();
}

export async function actualizarSuperheroe(id, datosActualizados) {
  return await superHeroRepository.actualizar(id, datosActualizados);
}

export async function eliminarSuperheroe(id) {
  return await superHeroRepository.eliminar(id);
}

export async function eliminarSuperheroePorNombre(nombre) {
  return await superHeroRepository.eliminarPorNombre(nombre);
}