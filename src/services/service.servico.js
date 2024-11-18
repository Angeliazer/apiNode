import repositoryServico from '../repositories/repository.servico.js'

async function AddServico(servico){
    return await repositoryServico.AddServico(servico)
}

async function ListaServicoClientes(idUsuario, idCliente){

    return await repositoryServico.ListaServicoClientes(idUsuario, idCliente)
}

export default {AddServico, ListaServicoClientes}