import serviceUsuario from "../services/service.usuario.js"
import { Usuario } from "../models/model.usuario.js"

// const data = [
//     {name:"Maria Aparecida", email:"cida.rigon@hotmail.com", cargo: "professora", status: "ativo", password:"12345"},
//     {name:"Alexsander", email:"alex@gmail.com", cargo: "bancário", status: "inativo", password:"12345"},
//     {name:"Angélica Rigon", email:"jeca@gmail.com", cargo: "mestre", status: "ativo", password:"12345"},
//     {name:"Angeliázer", email:"yyrigon@gmail.com", cargo: "gerente", status: "ativo", password:"Rigon"},
//     {name:"Lanangel", email:"lana.rigon@hotmail.com", cargo: "dona de casa", status: "ativo", password:"12345"},
//     {name:"Peterson", email:"peterson@gmail.com", cargo: "professor", status: "ativo", password:"Rigon"},
// ]

async function AddUsuario(req, res) {
  try {
    const { nome, email, password, apelido } = req.body

    const user = new Usuario(nome, email, password, apelido)

    const usuario = await serviceUsuario.AddUsuario(user)

    if (usuario.idUsuario) {
      res.status(201).json(usuario)
    }
    //   else
    //     res.status(500).json({error: 'Erro na requisição ao Banco de Dados...'})
  } catch (error) {
    res.status(401).json({ error: error })
  }
}

async function Listar(req, res) {
  try {
    const usuarios = await serviceUsuario.Listar()

    if (usuarios.length > 0) res.status(200).json(usuarios)
    else
      res.status(500).json({ error: "Erro na requisição ao Banco de Dados..." })
  } catch (error) {
    res.status(500).json({ status: error })
  }
}

async function Login(req, res) {
  try {
    //const {email, password} = req.body

    const login = { ...req.body }

    const usuario = await serviceUsuario.Login(login.email, login.password)

    if (usuario.length !== 0) res.status(200).json(usuario)
    else res.status(401).json({ error: "Usuário ou Senha inválidos..." })
  } catch (error) {
    res.status(500).json({ error })
  }
}

async function Perfil(req, res) {
  try {
    const id_usuario = req.idUsuario

    const usuario = await serviceUsuario.Perfil(id_usuario)

    if (usuario != null) {
      res.status(200).json(usuario)
    } else {
      res.status(404).json({ status: "Registro não encontrado..." })
    }
  } catch (error) {
    res.status(500).json({ status: error })
  }
}

async function ListarId(req, res) {
  try {
    const idUsuario = req.params

    const usuario = await serviceUsuario.ListarId(idUsuario.id)

    if (usuario != null) res.status(200).json(usuario)
    else res.status(404).json({ status: "Registro não encontrado..." })
  } catch (error) {
    res.status(500).json({ status: error })
  }
}
export default { Login, AddUsuario, Listar, ListarId, Perfil }
