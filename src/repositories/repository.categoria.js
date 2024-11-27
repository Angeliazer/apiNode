import pool from '../database/dataPostgree.js';

const Listar = async () => {
    try {
        const sql = `select *
                     from categoria order by descricao`;
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

async function Add(categoria) {

    try {
        const sql = `insert into categoria ("descricao") VALUES ($1) RETURNING idcategoria`;

        const result = await pool.query(sql, [categoria.descricao]);

        return {idcategoria: result.rows[0].idcategoria};
    } catch (error) {
        return {error};
    }
}

export default {Listar, Add};
