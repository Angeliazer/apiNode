import repositoryCategoriapostgre from '../repositories/repository.categoriapostgre.js';

async function Listar() {
    //Acessar o banco de dados....

    const retorno = await repositoryCategoriapostgre.Listar // Chamada Banco de dados Postgre

    return retorno
}

export default Listar;