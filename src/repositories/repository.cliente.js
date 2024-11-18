import { connectToDatabase } from "../database/db.js"
import sql from "mssql"
const { Transaction } = sql

async function AddCliente(cliente) {
  try {
    const pool = await connectToDatabase()

    const transaction = new Transaction(pool)

    try {
      await transaction.begin()

      const result = await transaction
        .request()
        .input("nome", sql.VarChar, cliente.nome)
        .input("endereco", sql.VarChar, cliente.endereco)
        .input("nro", sql.Int, cliente.nro)
        .input("bairro", sql.VarChar, cliente.bairro)
        .input("cidade", sql.VarChar, cliente.cidade)
        .input("estado", sql.VarChar, cliente.estado)
        .input("email", sql.VarChar, cliente.email)
        .input("ddd", sql.VarChar, cliente.ddd)
        .input("telefone", sql.VarChar, cliente.telefone)
        .input("idUsuario", sql.Int, cliente.idUsuario)
        .query(`INSERT INTO cliente (nome, endereco, nro, bairro, cidade, estado, email, ddd, telefone, idUsuario) 
                    OUTPUT INSERTED.idCliente
                    VALUES (@nome, @endereco, @nro, @bairro, @cidade, @estado, @email, @ddd, @telefone, @idUsuario)`)

      await transaction.commit()

      return { idCliente: result.recordset[0].idCliente }
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

async function ListarByEmail(email, id) {
  try {
    const pool = await connectToDatabase()

    const cliente = await pool
      .request()
      .input("email", sql.VarChar, email)
      .input("id", sql.Int(id), id).query(`select * from cliente  
                where email = @email and idUsuario = @id`)

    if (cliente.rowsAffected[0] === 0) return false
    else return true
  } catch (err) {
    return false
  }
}

async function ListarById(id) {
  try {
    const pool = await connectToDatabase()

    const cliente = await pool.request().input("id", sql.Int, id)
      .query(`select * from cliente  
                where idUsuario = @id order by nome`)

    return cliente.recordset
  } catch (err) {
    return null
  }
}

async function DeleteById(id_usuario, id_cliente) {
  try {
    const pool = await connectToDatabase()

    const cliente = await pool
      .request()
      .input("id_usuario", sql.Int, id_usuario)
      .input("id_cliente", sql.Int, id_cliente).query(`delete from cliente  
                where idUsuario = @id_usuario and idCliente = @id_cliente`)

    return cliente.rowsAffected[0]
  } catch (err) {
    //console.log(err)
    return 0
  }
}

async function ListaByNome(nome, id) {
  try {
    const pool = await connectToDatabase()

    const cliente = await pool
      .request()
      .input("nome", sql.VarChar, `%${nome}%`)
      .input("id", sql.Int, id)
      .query("SELECT * FROM cliente WHERE idUsuario = @id and nome LIKE @nome")

    return cliente.recordset
  } catch (error) {
    return []
  }
}

export default {
  AddCliente,
  ListarByEmail,
  ListarById,
  DeleteById,
  ListaByNome,
}
