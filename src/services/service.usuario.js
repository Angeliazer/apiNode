import repopsitoryUsuario from "../repositories/repository.usuario.js"
import jwt from "../token.js"
import repositoryUsuarioPostgree from "../repositories/repository.usuariopostgre.js"

async function AddUsuario(user) {
  //   const validarUsuario = await repopsitoryUsuario.ListarByEmail(user.email)

  const validarUsuario = await repositoryUsuarioPostgree.ListarByEmail(
    user.email
  ) // Chamada Banco de dados Postgre

  if (validarUsuario.idusuario) throw "E-mail de usuário já cadastrado....!"

  user.password = await jwt.EncryptaPassword(user.password)

  //const usuario = await repopsitoryUsuario.AddUsuario(user) // Chamada Banco de dados Mssql

  const usuario = await repositoryUsuarioPostgree.AddUsuario(user) // Chamada Banco de dados Postgre

  usuario.token = jwt.CreateToken(usuario.idUsuario)

  return usuario
}

async function Listar() {
  //Acessar o banco de dados....

  const retorno = await repopsitoryUsuario.Listar()

  return retorno
}

async function ListarId(id) {
  //Acessar o banco de dados....

  return await repopsitoryUsuario.ListarId(id)
}

async function Perfil(id) {
  //Acessar o banco de dados....

  return await repopsitoryUsuario.ListarById(id)
}

async function Login(email, password) {
  //Acessar o banco de dados....

  //const usuario = await repopsitoryUsuario.ListarByEmail(email) // Chamada Mssql

  const usuario = await repositoryUsuarioPostgree.ListarByEmail(email) // Chamada Postgre

  if (usuario.length == 0) return []

  const ok = await jwt.VerifyPassword(password, usuario.password)

  if (!ok) return []

  usuario.token = jwt.CreateToken(usuario.idUsuario)
  delete usuario.password

  return usuario
}

export default { AddUsuario, Listar, Login, ListarId, Perfil }
