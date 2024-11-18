import { connectToDatabase } from "../database/db.js"
import sql from "mssql"
const { Transaction } = sql

async function AddUsuario(user) {
  try {
    const pool = await connectToDatabase()

    const transaction = new Transaction(pool)

    try {
      await transaction.begin()

      const result = await transaction
        .request()
        .input("nome", sql.VarChar, user.nome)
        .input("email", sql.VarChar, user.email)
        .input("password", sql.VarChar, user.password)
        .input("apelido", sql.VarChar, user.apelido)
        .query(`INSERT INTO usuario (nome, email, password, apelido) 
                    OUTPUT INSERTED.idUsuario
                    VALUES (@nome, @email, @password, @apelido)`)

      await transaction.commit()

      return { idUsuario: result.recordset[0].idUsuario }
    } catch (err) {
      await transaction.rollback()
      return { err }
    } finally {
      await (pool && pool.close())
    }
  } catch {
    return {}
  }
}

async function Listar() {
  try {
    const pool = await connectToDatabase()

    const result = await pool
      .request()
      .query("SELECT idUsuario, nome, email from usuario order by nome")

    return result.recordset
  } catch (err) {
    return []
  }
}

async function ListarId(id) {
  try {
    const pool = await connectToDatabase()

    const result = await pool
      .request()
      .input("id", sql.Int, parseInt(id))
      .query(`select idUsuario, nome, email from usuario where idUsuario = @id`)

    return result.recordset[0]
  } catch (err) {
    return null
  }
}

async function ListarById(id) {
  try {
    const pool = await connectToDatabase()

    const usuario = await pool.request().input("id", sql.Int, parseInt(id))

    delete usuario.recordset[0].password

    return usuario.recordset[0]
  } catch (err) {
    return null
  }
}

async function ListarByEmail(email) {
  try {
    const pool = await connectToDatabase()

    const usuario = await //.input('password', sql.VarChar, password)
    pool.request().input("email", sql.VarChar, email)
      .query(`select * from usuario  
                where email = @email`)

    if (usuario.rowsAffected[0] == 0) return []
    else return usuario.recordset[0]
  } catch (err) {
    return []
  }
}

export default { AddUsuario, Listar, ListarByEmail, ListarId, ListarById }
