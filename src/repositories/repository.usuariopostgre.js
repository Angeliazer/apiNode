import pool from '../database/dataPostgree.js';

async function ListarByEmail(email) {
    try {
        const sql = `select * from usuario where email = $1`;
        const response = await pool.query(sql, [email]);

        if (response.rows.length === 0) return [];
           else
               return response.rows[0];
    } catch (err) {
        return [];
    }
}

async function AddUsuario(user) {

      // pool.connect((err, client, release) => {
      //   if (err) {
      //     return console.error("Erro ao conectar ao banco de dados:", err.stack)
      //   }
      //   console.log("Conectado ao banco de dados com sucesso")
      //   release()
      // })

    try {
        const sql = `insert into usuario ("nome", "email", "password", "apelido", "dataCadastro") VALUES ($1, $2, $3, $4, $5) 
            RETURNING idusuario`;

        const result = await pool.query(sql, [
            user.nome,
            user.email,
            user.password,
            user.apelido,
            user.dataCadastro
        ]);

        return {idusuario: result.rows[0].idusuario};
    } catch (error) {
        return {error};
    }
}

export default {ListarByEmail, AddUsuario};
