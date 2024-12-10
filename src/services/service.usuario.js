import jwt from '../token.js';
import repopsitoryUsuario from '../repositories/repository.usuario.js';
import repositoryUsuarioPostgre from '../repositories/repository.usuariopostgre.js';

async function AddUsuario(user) {

    const validarUsuario = await repositoryUsuarioPostgre.ListarByEmail(user.email);

    if (validarUsuario.idusuario)
        return {idusuario: -1};

    user.password = await jwt.EncryptaPassword(user.password);

    return await repositoryUsuarioPostgre.AddUsuario(user);
}

async function Listar() {
    //Acessar o banco de dados....
    return await repopsitoryUsuario.Listar();
}

async function ListarId(id) {
    //Acessar o banco de dados....

    return await repopsitoryUsuario.ListarId(id);
}

async function Perfil(id) {
    //Acessar o banco de dados....

    return await repopsitoryUsuario.ListarById(id);
}

async function Login(email, password) {
    //Acessar o banco de dados....

    const usuario = await repositoryUsuarioPostgre.ListarByEmail(email); // Chamada Postgre

    if (usuario.length === 0) return [];

    const ok = await jwt.VerifyPassword(password, usuario.password.trim());

    if (!ok) return [];

    usuario.token = jwt.CreateToken(usuario.idusuario);
    delete usuario.password;

    return usuario;
}

export default {AddUsuario, Listar, Login, ListarId, Perfil};
