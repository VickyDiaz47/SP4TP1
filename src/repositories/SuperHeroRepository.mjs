import SuperHero from '../models/SuperHero.mjs';
import IRepository from './IRepository.mjs';

class SuperHeroRepository extends IRepository {
    async obtenerPorId(id) {
      return await SuperHero.findById(id);  
    }
    
    async obtenerTodos() {
        return await SuperHero.find({});
    }  
    
    async buscarPorAtributo(atributo, valor) {
        try {
        const filtro = {};
        filtro[atributo] = valor;
        return await SuperHero.find(filtro);
    } catch (error) {
        console.error(`Error al buscar por ${atributo}:`, error);
        throw error;
    }
    }
    
    async obtenerMayoresDe30() {
        try {
        return await SuperHero.find({ edad: { $gt: 30 } });
    } catch (error) {
        console.error('Error al obtener héroes mayores de 30:', error);
        throw error;
    }
  }

  async actualizar(id, datosActualizados) {
    return await SuperHero.findByIdAndUpdate(id, datosActualizados, {
      new: true, // Para que devuelva el objeto actualizado
      runValidators: true // Para que respete las validaciones del esquema
    });
  }


  async eliminar(id) {
    return await SuperHero.findByIdAndDelete(id);
  }


  async eliminarPorNombre(nombre) {
    return await SuperHero.findOneAndDelete({ nombreSuperHeroe: nombre });
  }

}
export default new SuperHeroRepository();