import repositoryCategoria from "../repositories/repository.categoria.js"

const Listar = async () => {
  //Acessar o banco de dados....
  return await repositoryCategoria.Listar()
}

export default { Listar }
