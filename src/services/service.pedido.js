import repopsitoryPedido from "../repositories/repository.pedido.js"
import jwt from "../token.js"

async function AddPedido(itensPedido) {

    // const validarUsuario = await repopsitoryUsuario.ListarByEmail(email)

    // if (validarUsuario.idUsuario)
    //     throw 'E-mail de usuário já cadastrado....!'

    const pedido = await repopsitoryPedido.AddPedido(itensPedido)

    return pedido

}


export default {AddPedido}