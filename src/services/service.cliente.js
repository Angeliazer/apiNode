import repositoryCliente from '../repositories/repository.cliente.js';

async function AddCliente(cliente) {

    const validarCliente = await repositoryCliente.ListarByEmail(cliente.email, cliente.idUsuario);

    if (validarCliente)
        throw 'E-mail já cadastrado';

    const cli = await repositoryCliente.AddCliente(cliente);

    return cli;
}

async function ListarById(id) {

    //Acessar o banco de dados....

    const retorno = await repositoryCliente.ListarById(id);

    return retorno;
}

async function DeleteById(id_usuario, id_cliente) {

    //Acessar o banco de dados....

    const retorno = await repositoryCliente.DeleteById(id_usuario, id_cliente);

    return retorno;
}

async function ListaByNome(nome, id) {

    //Acessar o banco de dados....

    const retorno = await repositoryCliente.ListaByNome(nome, id);

    return retorno;
}

export default {AddCliente, ListarById, DeleteById, ListaByNome};