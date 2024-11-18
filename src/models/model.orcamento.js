export class Orcamento {
  constructor(idUsuario, idCliente, idOrcamento, vlrTotal, data, servico, items = []) {
    this.idUsuario = idUsuario
    this.idCliente = idCliente
    this.idOrcamento = idOrcamento
    this.vlrTotal = vlrTotal
    this.data = data
    this.servico = servico
    this.items = items
  }
}
