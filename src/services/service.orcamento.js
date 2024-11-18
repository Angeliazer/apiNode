import repositoryOrcamento from '../repositories/repository.orcamento.js';

async function AddOrcamento(orcamento) {

    return await repositoryOrcamento.AddOrcamento(orcamento);
}

async function UpdateOrcamento(orcamento) {
    return await repositoryOrcamento.UpdateOrcamento(orcamento);
}

async function ListaOrcamento(id) {
    return await repositoryOrcamento.ListaOrcamento(id);
}

async function ListaOrcamentoData(dataInicial, dataFinal, idUsuario) {
    return await repositoryOrcamento.ListaOrcamentoData(dataInicial, dataFinal, idUsuario);
}

async function ListaOrcCliente(idUsuario, idCliente) {

    return await repositoryOrcamento.ListaOrcCliente(idUsuario, idCliente);
}

async function ListaItemsOrcamento(idOrcamento) {

    return await repositoryOrcamento.ListaItemsOrcamento(idOrcamento);

}

async function DelOrcamento(idOrcamento) {
    return await repositoryOrcamento.DelOrcamento(idOrcamento);
}


export default {
    AddOrcamento,
    ListaOrcamento,
    ListaOrcCliente,
    ListaOrcamentoData,
    DelOrcamento,
    ListaItemsOrcamento,
    UpdateOrcamento
};
