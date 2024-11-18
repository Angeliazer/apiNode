import servicePedido from '../services/service.pedido.js'

async function AddPedido(req, res){

    try {
      
      const itensPedido  = req.body

      itensPedido.idUsuario = req.idUsuario 

      const pedidos= await servicePedido.AddPedido(itensPedido)

      if (pedidos.idPedido)
        res.status(201).json(pedidos)
          else 
            res.status(500).json({error: 'Erro na requisição ao Banco de Dados...'})
    } catch (error) {
        res.status(500).json({status: error})
  }
}

export default {AddPedido}
