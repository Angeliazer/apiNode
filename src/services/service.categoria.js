import repopsitoryCategoriaspostgre from '../repositories/repository.catetoriapostgre.js';

async function Listar() {
    //Acessar o banco de dados....

    const retorno =  await repopsitoryCategoriaspostgre.Listar();
    return retorno;
}

export default Listar;