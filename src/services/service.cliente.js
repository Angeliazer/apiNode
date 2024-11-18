import repositoryCliente from '../repositories/repository.cliente.js';

async function AddCliente(cliente) {

    const validarCliente = await repositoryCliente.ListarByEmail(cliente.email, cliente.idUsuario);

    if (validarCliente)
        throw 'E-mail já cadastrado';

    return await repositoryCliente.AddCliente(cliente);
}

async function ListarById(id) {

    //Acessar o banco de dados....

    return await repositoryCliente.ListarById(id);
}

async function DeleteById(id_usuario, id_cliente) {

    //Acessar o banco de dados....

    return await repositoryCliente.DeleteById(id_usuario, id_cliente);
}

async function ListaByNome(nome, id) {

    //Acessar o banco de dados....

    return await repositoryCliente.ListaByNome(nome, id);
}

export default {AddCliente, ListarById, DeleteById, ListaByNome};