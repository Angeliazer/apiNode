import repopsitoryCategorias from '../repositories/repository.catetoriapostgree.js';

async function Listar() {
    //Acessar o banco de dados....

    return await repopsitoryCategorias.Listar()
}

export default Listar;