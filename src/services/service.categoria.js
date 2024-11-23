import repositoryCategoria from "../repositories/repository.categoria.js"

const Listar = async () => {
  //Acessar o banco de dados....

  const result = await repositoryCategoria.Listar()

  console.log(result, "3")

  return result
}

export default { Listar }
