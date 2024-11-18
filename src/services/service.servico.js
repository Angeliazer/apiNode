import repositoryServico from '../repositories/repository.servico.js'

async function AddServico(servico){

    const res = await repositoryServico.AddServico(servico)

    return res

}

async function ListaServicoClientes(idUsuario, idCliente){

    const res = await repositoryServico.ListaServicoClientes(idUsuario, idCliente)

    return res

}

export default {AddServico, ListaServicoClientes}