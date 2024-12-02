import repositoryCategoria from "../repositories/repository.categoria.js"

const Listar = async () => {
  //Acessar o banco de dados....
  return await repositoryCategoria.Listar()
}

const Add = async (categoria) => {
  //Acessar o banco de dados....
  return await repositoryCategoria.Add(categoria)
}

const Update = async (categoria) => {
  //Acessar o banco de dados....
  return await repositoryCategoria.Update(categoria)
}
export default { Listar, Add, Update }
