import pool from '../database/dataPostgree.js';

const Listar = async () => {
    try {
        const sql = `select *
                     from grupo`;
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

async function Add(grupo) {

    try {
        const sql = `insert into grupo ("descricao") VALUES ($1) RETURNING idgrupo`;

        const result = await pool.query(sql, [
            grupo.descricao
        ]);

        return {idgrupo: result.rows[0].idgrupo};
    } catch (error) {
        return {error};
    }
}

export default {Listar, Add};
