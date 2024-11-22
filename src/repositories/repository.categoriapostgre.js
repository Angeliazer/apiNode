import pool from '../database/dataPostgree.js';

async function Listar() {
    try {
        const sql = `select * from categoria`;

        const response = await pool.query(sql);

        if (response.rows.length === 0) return [];
        else
            return response.rows[0];
    } catch (err) {
        return [];
    }
}

export default Listar;