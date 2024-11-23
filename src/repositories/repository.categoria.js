import pool from "../database/dataPostgree.js"

const Listar = async () => {
  try {
    const sql = `select * from categoria`

    const response = await pool.query(sql)

    console.log(response)

    if (response.rows.length === 0) return []
    else return response.rows
  } catch (err) {
    return []
  }
}

export default { Listar }
