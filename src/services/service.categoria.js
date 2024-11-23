import repopsitoryCategoriasposgre from '../repositories/repository.catetoriapostgre.js';

async function Listar() {
    //Acessar o banco de dados....

    return await repopsitoryCategoriasposgre.Listar();
}

export default Listar;