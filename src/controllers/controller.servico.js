import serviceServico from "../services/service.servico.js"

async function AddServico(req, res) {
  const servico = { ...req.body }

  try {
    const response = await serviceServico.AddServico(servico)

    if (response.status == "Ok") {
      res.status(201).json(response)
    } else {
      res.status(401).json({ status: response.status })
    }
  } catch (error) {
    res.status(401).json({ status: error })
  }
}

async function ListaServicoClientes(req, res) {
  const idUsuario = req.query.idUsuario
  const idCliente = req.query.idCliente

  try {
    const response = await serviceServico.ListaServicoClientes(
      idUsuario,
      idCliente
    )

    if (response.length !== 0) {
      res.status(200).json(response)
    } else {
      res.status(401).json([])
    }
  } catch (error) {
    res.status(501).json({ error: "Problemas no Servidor..Tente mais tarde." })
  }
}

export default { AddServico, ListaServicoClientes }
