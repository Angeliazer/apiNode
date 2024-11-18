export class Servico {
  constructor(
    idUsuario,
    idCliente,
    idOrcamento,
    dataIni,
    dataFim,
    situacao,
    total,
    saldo
  ) {
    this.idUsuario = idUsuario
    this.idCliente = idCliente
    this.idOrcamento = idOrcamento
    this.dataIni = dataIni
    this.dataFim = dataFim
    this.situacao = situacao
    this.total = total
    this.saldo = saldo
  }
}
