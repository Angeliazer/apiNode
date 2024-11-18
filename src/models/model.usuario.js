
export class Usuario {
    constructor (nome, email, password, apelido){
        this.nome = nome;
        this.email = email; 
        this.password = password;
        this.apelido = apelido
    }

    converteJson(obj){
        return  JSON.stringify(obj)
    }

}

