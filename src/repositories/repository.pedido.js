import {connectToDatabase} from "../database/db.js"
import sql from "mssql"

async function AddPedido(itensPedido){
    try {
        //const pool = await connectToDatabase()

        // console.log(itensPedido)

        // console.log(itensPedido.idUsuario)

        for (let i=0; i < itensPedido.itensPedido.length; ++i){
             console.log(itensPedido.itensPedido[i])
         }

        // const result = await pool.request()
        //     .input('nome', sql.VarChar, nome)
        //     .input('email', sql.VarChar, email)
        //     .input('password', sql.VarChar, password)
        //     .query(`INSERT INTO usuario (nome, email, password) 
        //         OUTPUT INSERTED.idUsuario
        //         VALUES (@nome, @email, @password)`);

        // return {idUsuario : result.recordset[0].idUsuario}

        return {}
    } 
    catch (err) {
        //pool.close()
        return {}
    }
}

export default {AddPedido}