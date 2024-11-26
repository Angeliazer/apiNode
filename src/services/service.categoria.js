import repositoryCategoria from "../repositories/repository.categoria.js"

const Listar = async () => {
  //Acessar o banco de dados....
  return await repositoryCategoria.Listar()
}

const Add = async () => {
  //Acessar o banco de dados....
  return await repositoryCategoria.Add()
}

export default { Listar, Add }
