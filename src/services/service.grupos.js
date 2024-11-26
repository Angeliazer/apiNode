import repositoryGrupo from "../repositories/repository.grupo.js"

const Listar = async () => {
    //Acessar o banco de dados....
    return await repositoryGrupo.Listar()
}

const Add = async () => {
    //Acessar o banco de dados....
    return await repositoryGruppo.Add()
}

export default { Listar, Add }
