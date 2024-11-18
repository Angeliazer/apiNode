import serviceCliente from '../services/service.cliente.js'
import { Cliente } from '../models/model.cliente.js'

async function AddCliente(req, res) {
  
  try {
    const {nome, endereco, nro, bairro, cidade, estado, email, ddd, telefone, idUsuario} = req.body

    const cliente = new Cliente(nome, endereco, nro, bairro, cidade, estado, email, ddd, telefone, idUsuario)

    const cli = await serviceCliente.AddCliente(cliente);
    if (cli.idCliente) {
      res.status(201).json(cli)
    } 
      else res.status(401).json({ error: "E-mail já cadastrado" })
  } catch (error) {
      res.status(401).json({ error: error })
  }
}

async function ListarById(req, res) {
  const id = req.body.idUsuario

  try {
    const clientes = await serviceCliente.ListarById(id)

    if (clientes.length > 0) res.status(200).json(clientes)
     else res.status(200).json([]);
  } catch (error) {
     res.status(500).json({ status: error })
  }
}

async function DeleteById(req, res) {

  const idUsuario = req.body.idUsuario
  const idCliente = req.params.idCliente

  try {
    const cliente = await serviceCliente.DeleteById(idUsuario, idCliente)

    if (cliente === 0) res.status(200).json({ status: 0 })
      else 
         res.status(200).json({ status: 1 })
  } catch (error) {
      res.status(500).json({ status: error })
  }
}

async function ListaByNome(req, res){

  const nome = req.query.nome
  const idUsuario = req.body.idUsuario

  try {
    const cliente = await serviceCliente.ListaByNome(nome, idUsuario)

    if (cliente.length === 0)
        res.status(200).json([])
      else 
         res.status(200).json(cliente)
  } catch (error) {
      res.status(500).json({ status: error })
  }


}

export default { AddCliente, ListarById, DeleteById, ListaByNome }
