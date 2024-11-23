import pool from '../database/dataPostgree.js';

const Listar = async () => {
    try {
        const sql = `select *
                     from categoria`;
        const response = await pool.query(sql);
        if (response.rows.length !== 0) {
            return response.rows;
        } else {
            return [];
        }
    } catch (err) {
        return [];
    }
};

export default {Listar};
