import repositoryCategoriapostgre from '../repositories/repository.categoriapostgre.js';

async function Listar() {
    //Acessar o banco de dados....

    return await repositoryCategoriapostgre.Listar() // Chamada Banco de dados Postgre
}

export default Listar;